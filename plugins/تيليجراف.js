import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'

let handler = async (m) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw 'هذا الامر خاص برفع الصور لموقع\nhttps://telegra.ph/\nالان قم بالاشارة للصورة التي تريد رفعها للموقع وسوف تحصل على رابطها \n اشر اليها ثم اكتب\n*تيليجراف.*'
  let media = await q.download()
  let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
  let link = await (isTele ? uploadImage : uploadFile)(media)
  m.reply(`▢ ${media.length} Byte(s) 

▢ ${isTele ? '' : '(Unknown)'} 
▢ *هذا هو رابط الصورة:* ${link}`)
}
handler.help = ['tourl']
handler.tags = ['uploader']
handler.command = ['تيليجراف', 'تيليغراف','dir']
export default handler;
