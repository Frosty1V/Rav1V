let handler = async (m, { conn, text }) => {
  if (!text) throw `هذا الامر يمكنك من خلاله ان تغير بايو البوت \n*غير_البايو صل على النبي.*`
    try {
   await conn.updateProfileStatus(text).catch(_ => _)
   conn.reply(m.chat, ' تم تغيير البايو بنجاح', m)
} catch {
      throw 'Yah Error.. :D'
    }
}
handler.help = ['setbio']
handler.tags = ['owner']
handler.command = /^(تغيير البايو)$/i
handler.owner = true

export default handler
