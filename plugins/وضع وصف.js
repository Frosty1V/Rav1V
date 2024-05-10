var handler = async (m, { conn, text, isROwner, isOwner }) => {

if (text) {
await conn.groupUpdateDescription(m.chat, text)
conn.reply(m.chat, `✅ *تم تحديث الوصف بنجاح*`, m,  )
} else return conn.reply(m.chat, ' * أدخل وصفًا جديدًا للمجموعة مثال*\n\n*وضع_وصف صل على النبي.', m, )

}
handler.help = ['setdesc']
handler.tags = ['owner']
handler.command = /^وضع_وصف$/i

handler.botAdmin = true
handler.group = true
handler.admin = true

export default handler
