let handler = async (m, { conn, command, usedPrefix, args, text}) => {
let input = `ابحث عن اي شيء مثال:\n
${usedPrefix + command} من هوا عثمان بن عفان`
	if (!text) return m.reply(input) axios.get('https://www.bing.com/search?q=' + text)
  .then(response => {
    const $ = cheerio.load(response.data);
    const searchResults = [];
    $('.b_algo').each((index, element) => {
      const title = $(element).find('h2').text();
      const url = $(element).find('a').attr('href');
      const description = $(element).find('.b_caption p').text();
      searchResults.push({ title, url, description });
    });
            let bing = `Bing Search From : ${text}\n\n`;
            for (let g of searchResults) { 
              bing += ` *العنوان* : ${g.title}\n`;
              bing += ` *الوصف* : ${g.description}\n`;
              bing += ` *الرابط* : ${g.url}\n\n`;
            }
  conn.sendMessage(m.chat, {text: bing, contextInfo:
					{
	"externalAdReply": {
							"title": '𝓡𝓲𝔂𝓾𝓷𝓑𝓸𝓽',
							"body": '',
							"showAdAttribution": true,
							"mediaType": 1,
							"sourceUrl": '',
							"thumbnailUrl": 'https://telegra.ph/file/3a22a7e5574face2c6eca.png',
							"renderLargerThumbnail": true

						}
					}}, {quoted: m})
					}).catch(err => {
					m.reply('حدث خطأ اعد المحاوله')
					})
}
handler.help = ['bingsearch']
handler.tags = ['search']
handler.command = /^بحث_بينج$/i
handler.limit = false
export default handler
