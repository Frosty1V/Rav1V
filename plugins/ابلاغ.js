let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `اذا كنت تواجه مشكلة ما في البوت أو أحد الأوامر لا تعمل معك فاكتب الامر متبوع بالمشكلة التي تعاني منها في البوت وسيتم تلبية طلبكم من طرف صاحب البوت `
  if (text.length < 10) throw `يجب ان تكون الرسالة فيها اكثر من اربع كلمات `
  if (text.length > 1000) throw `الحد الادنى هو 1000 حرف اختر ما تريد قوله !`
  let teks = `*${command.toUpperCase()}!*\n\nfrom : *@${m.sender.split`@`[0]}*\n\nmessage : ${text}\n`
  conn.reply(global.nomorown + '@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, null, {
      contextInfo: {
          mentionedJid: [m.sender]
      }
  })
  m.reply(`.....يتم إرسال الرسالة إلى صاحب البوت،\n بمجرد ان يقرأ صاحب البوت هذه الرسالة سيتم الرد عليكم لا تقلقو*`)
}
handler.help = ['report']
handler.tags = ['infobot']
handler.command = /^(ابلاغ)$/i
export default handler
