let handler = async (m, { conn, text }) => {
    if (!text) throw `لم يتم تحديد نص. يرجى إعادة المحاولة بتحديد النص الجديد للـ Bio.\nمثال: ${usedPrefix}تغيير البايو صل على النبي.`
    try {
        let command = text.split(' ')[0].toLowerCase() // يأخذ الجزء الأول من النص كـ command
        let newBio = text.substring(command.length + 1) // يأخذ الجزء الباقي من النص كـ الـ Bio

        await conn.setStatus(newBio).catch(_ => _)
        conn.reply(m.chat, 'تم تحديث الـ Bio بنجاح.', m)
    } catch {
        throw 'حدث خطأ أثناء تحديث الـ Bio.'
    }
}

handler.help = ['تغيير البايو']
handler.tags = ['owner']
handler.command = /^(البايو)$/i
handler.owner = true

export default handler
