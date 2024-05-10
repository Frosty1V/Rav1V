let handler = async (m, { conn, text, isROwner, isOwner }) => {
if (text) {
global.db.data.chats[m.chat].sBye = text
m.reply('*تم وضع الوداع بنجاح*')
} else throw `ااكتب الامر ثم اكتب الوداع بعد الامر مثال:*\n*- @user (mención)*`
}
handler.help = ['setbye']
handler.tags = ['owner']
handler.command = ['وضع_وداع'] 
handler.admin = true
export default handler
