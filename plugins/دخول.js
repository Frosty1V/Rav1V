let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})( [0-9]{1,3})?/i

let handler = async (m, { conn, text, isOwner }) => {
    let [_, code, expired] = text.match(linkRegex) || []
    if (!code) throw 'الرابط غير صالح'
    let res = await conn.groupAcceptInvite(code)
    m.reply(`تم الانضمام للمجموعة بنجاح`)
    let chats = global.db.data.chats[res]
    if (!chats) chats = global.db.data.chats[res] = {}
}
handler.help = ['join']
handler.tags = ['owner']

handler.command = /^دخول$/i
handler.rowner = true

export default handler

const isNumber = (x) => (x = parseInt(x), typeof x === 'number' && !isNaN(x))
