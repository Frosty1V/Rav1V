import fetch from 'node-fetch'
import { addExif } from '../lib/sticker.js'
import { Sticker } from 'wa-sticker-formatter'
let handler = async (m, { conn, args, usedPrefix, command }) => {
let stiker = false
try {
let [packname, ...author] = args.join` `.split`|`
author = (author || []).join`|`
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || q.mediaType || ''
if (/webp/g.test(mime)) {
let img = await q.download?.()
stiker = await addExif(img, packname || global.packname, author || global.author)
} else if (/image/g.test(mime)) {
let img = await q.download?.()
stiker = await createSticker(img, false, packname || global.packname, author || global.author)
} else if (/video/g.test(mime)) {
let img = await q.download?.()
stiker = await mp4ToWebp(img, { pack: packname || global.packname, author: author || global.author })
} else if (args[0] && isUrl(args[0])) {
stiker = await createSticker(false, args[0], '', author, 20)
} else throw `*رد على صوره او فيديو او GIF ${usedPrefix + command}*`
} catch {
stiker = '*لازم ترد علي صورة او فيديو*'	
} finally {
m.reply(stiker)}}
handler.help = ['sfull']
handler.tags = ['sticker']
handler.command = ['ملصق', 'س']
export default handler
