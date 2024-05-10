const handler = async (m, {conn, text, isROwner, isOwner}) => {
  const datas = global
  const idioma = datas.db.data.users[m.sender].language
  const _translate = JSON.parse(fs.readFileSync(`./language/${idioma}.json`))
  const tradutor = _translate.plugins.gc_setwelcome

  if (text) {
    m.reply('*تــم وضــع رســالــة الــتـرحـيب !*')
  } else throw `*أدخــل رســالــة الـتـرحــيب !*\n*عــشان تــعـمل مـنــشن أكــتب @user, عــشان تـحط أســم الـجروب أكـتب @group, عــشان تـحط وصــف أكــتب @desc*`
};
handler.help = ['setwelcome <text>']
handler.tags = ['group']
handler.command = ['الترحيب'] 
handler.admin = true
handler.owner = false

export default handler
