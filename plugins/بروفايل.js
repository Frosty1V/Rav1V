import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
import { canLevelUp, xpRange } from '../lib/levelling.js'
//import db from '../lib/database.js'

let handler = async (m, { conn, usedPrefix, command }) => {
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    if (!(who in global.db.data.users)) throw `✳️ المستخدم غير موجود في قاعدة البيانات`

    let ppUrl = await conn.getProfilePicture(who).catch(_ => null) // استرجاع رابط صورة المستخدم
    let user = global.db.data.users[who]
    let { name, exp, diamond, lastclaim, registered, regTime, age, level, role, warn } = global.db.data.users[who]
    let { min, xp, max } = xpRange(user.level, global.multiplier)
    let username = conn.getName(who)
    let math = max - xp
    let prem = global.prems.includes(who.split`@`[0])
    let sn = createHash('md5').update(who).digest('hex')

    let str = `*❖ ── ✦ ──『❄』── ✦ ── ❖*
*⤶❏ الاسم 👤:* ${username} ${registered ? '\n   • ' + name + ' ' : ''}
*⤶❏ المنشن 📧 : @${who.replace(/@.+/, '')}*
*⤶❏ الرقم ☎️ : ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}*
*⤶❏ الرابط 🖇️ : wa.me/${who.split`@`[0]}${registered ? '\n⤶❏ *🎈العمر*: ' + age + ' سنوات' : ''}*

*❖ ── ✦ ──『❄』── ✦ ── ❖*`

    conn.sendFile(m.chat, ppUrl, 'perfil.jpg', str, m, false, { mentions: [who] }) // إرسال صورة المستخدم برابطها
}

handler.help = ['profile']
handler.tags = ['group']
handler.command = ['profile', 'بروفايل']

export default handler
