import fetch from 'node-fetch';
import { addExif } from '../lib/sticker.js';
import { Sticker } from 'wa-sticker-formatter';

const handler = async (m, { conn, args, usedPrefix, command }) => {
    try {
        let stiker = false;
        const [packname, ...author] = args.join(' ').split('|');
        const authorName = (author || []).join('|');

        const q = m.quoted ? m.quoted : m;
        const mime = (q.msg || q).mimetype || q.mediaType || '';

        if (/webp/g.test(mime) || /image/g.test(mime) || /video/g.test(mime)) {
            const img = await q.download?.();

            if (/webp/g.test(mime)) {
                stiker = await addExif(img, packname || global.packname, authorName || global.author);
            } else if (/image/g.test(mime)) {
                stiker = await createSticker(img, false, packname || global.packname, authorName || global.author);
            } else if (/video/g.test(mime)) {
                stiker = await mp4ToWebp(img, { pack: packname || global.packname, author: authorName || global.author });
            }
        } else if (args[0] && isUrl(args[0])) {
            stiker = await createSticker(false, args[0], '', authorName, 20);
        } else {
            throw `*يرجى الرد على صورة أو فيديو أو GIF باستخدام ${usedPrefix + command}*`;
        }

        m.reply(stiker);
    } catch (error) {
        m.reply('*يجب أن ترد على صورة أو فيديو*');
    }
};

handler.help = ['sfull'];
handler.tags = ['sticker'];
handler.command = ['ملصق', 'س'];

export default handler;

const isUrl = (text) => text.match(/^https?:\/\/.*\.(jpeg|jpg|gif|png)$/i);

async function createSticker(img, url, packName, authorName, quality) {
    const stickerMetadata = { type: 'full', pack: packName, author: authorName, quality };
    return (new Sticker(img ? img : url, stickerMetadata)).toBuffer();
}

async function mp4ToWebp(file, stickerMetadata) {
    if (!stickerMetadata) {
        stickerMetadata = { pack: '', author: '', crop: false };
    } else {
        if (!stickerMetadata.pack) stickerMetadata.pack = '';
        if (!stickerMetadata.author) stickerMetadata.author = '';
        if (!stickerMetadata.crop) stickerMetadata.crop = false;
    }

    const getBase64 = file.toString('base64');
    const format = {
        file: `data:video/mp4;base64,${getBase64}`,
        processOptions: {
            crop: stickerMetadata.crop,
            startTime: '00:00:00.0',
            endTime: '00:00:07.0',
            loop: 0
        },
        stickerMetadata: { ...stickerMetadata },
        sessionInfo: {
            WA_VERSION: '2.2106.5',
            PAGE_UA: 'WhatsApp/2.2037.6 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36',
            WA_AUTOMATE_VERSION: '3.6.10 UPDATE AVAILABLE: 3.6.11',
            BROWSER_VERSION: 'HeadlessChrome/88.0.4324.190',
            OS: 'Windows Server 2016',
            START_TS: 1614310326309,
            NUM: '6247',
            LAUNCH_TIME_MS: 7934,
            PHONE_VERSION: '2.20.205.16'
        },
        config: {
            sessionId: 'session',
            headless: true,
            qrTimeout: 20,
            authTimeout: 0,
            cacheEnabled: false,
            useChrome: true,
            killProcessOnBrowserClose: true,
            throwErrorOnTosBlock: false,
            chromiumArgs: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--aggressive-cache-discard',
                '--disable-cache',
                '--disable-application-cache',
                '--disable-offline-load-stale-cache',
                '--disk-cache-size=0'
            ],
            executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
            skipBrokenMethodsCheck: true,
            stickerServerEndpoint: true
        }
    };

    const res = await fetch('https://sticker-api.openwa.dev/convertMp4BufferToWebpDataUrl', {
        method: 'post',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(format)
    });

    const base64Data = await res.text();
    return Buffer.from(base64Data.split(';base64,')[1], 'base64');
}
