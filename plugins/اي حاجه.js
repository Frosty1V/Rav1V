const { WAConnection } = require('@adiwajshing/baileys')

const conn = new WAConnection()
conn.connectOptions.timeoutMs = 30 * 1000

// قائمة المستخدمين المحظورين
let bannedUsers = {}

// مجموعة مطلوبة لاستخدام البوت في الخاص
const requiredGroup = '𝘚𝘶𝘱𝘱𝘰𝘳𝘵 𝘙𝘢𝘷 𝘉𝘰𝘵「┛'

conn.on('chat-update', async (chatUpdate) => {
    if (chatUpdate.messages && chatUpdate.count === 1 && chatUpdate.messages[0].key.remoteJid.endsWith('@s.whatsapp.net')) {
        const message = chatUpdate.messages.all()[0]
        const userJid = message.key.remoteJid

        // تحديد الرسائل الواردة في الخاص
        if (message.key.fromMe === false) {
            // إرسال رسالة تحذيرية بأنه يجب الانضمام إلى المجموعة لاستخدام البوت
            conn.sendMessage(userJid, 'يجب عليك الانضمام إلى مجموعة ' + requiredGroup + ' لاستخدام البوت في الخاص.')

            // حظر المستخدم من استخدام الأوامر
            bannedUsers[userJid] = true
            console.log(`تم حظر المستخدم من استخدام الاوامر ${userJid}`)
        }
    }

    // مراقبة دخول المستخدم للمجموعة المطلوبة
    if (chatUpdate.messages && chatUpdate.count === 1 && chatUpdate.messages[0].action && chatUpdate.messages[0].action.type === 'add') {
        const addedUserJid = chatUpdate.messages[0].participant

        // التحقق من مجموعة المستخدم الجديد
        if (addedUserJid in bannedUsers && chatUpdate.messages[0].key.remoteJid === requiredGroup + '@g.us') {
            // إلغاء حظر المستخدم عند دخوله للمجموعة
            delete bannedUsers[addedUserJid]
            console.log(`User ${addedUserJid} has been unbanned.`)
        }
    }
})

// تسجيل الدخول إلى WhatsApp
async function connectToWhatsApp() {
    await conn.connect()
    console.log('Connected to WhatsApp!')
}

connectToWhatsApp().catch(console.error)
