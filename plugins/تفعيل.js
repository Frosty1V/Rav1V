//import db from '../lib/database.js'

let handler = async (m, { conn, isOwner, isAdmin, isROwner} ) => {
    if (!(isAdmin || isOwner || isROwner)) return dfail('admin', m, conn)
    global.db.data.chats[m.chat].isBanned = false
    m.reply('تم تشغيل بوت راف في هذا المجموعه')   
}
handler.help = ['unbanchat']
handler.tags = ['owner']
handler.command = ['chaton', 'تفعيل'] 
handler.admin = true;

export default handler
