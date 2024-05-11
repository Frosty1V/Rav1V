import axios from "axios";

let handler = async (m, { args }) => {
    if (!args[0]) throw "*الرجاء كتابة اسم المدينة أو البلد الذي تريد معرفة مناخه*";
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${args}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273`);
        const res = response.data;

        const name = res.name;
        const country = res.sys.country;
        const weatherDesc = res.weather[0].description;
        const temperature = res.main.temp + "°C";
        const minTemp = res.main.temp_min + "°C";
        const maxTemp = res.main.temp_max + "°C";
        const humidity = res.main.humidity + "%";
        const windSpeed = res.wind.speed + "km/h";

        const weatherInfo = `「 📍 」المكان: ${name}\n「 🗺️ 」البلد: ${country}\n「 🌤️ 」المنظر: ${weatherDesc}\n「 🌡️ 」درجة الحرارة: ${temperature}\n「 💠 」 درجة الحرارة الصغرى: ${minTemp}\n「 📛 」 درجة الحرارة العظمى: ${maxTemp}\n「 💦 」الرطوبة: ${humidity}\n「 🌬️ 」سرعة الرياح: ${windSpeed}`;

        m.reply(weatherInfo);
    } catch (error) {
        return "*خطأ في الاستعلام عن الطقس*";
    }
};

handler.help = ['الطقس'];
handler.tags = ['أدوات'];
handler.command = /^(المناخ|الطقس)$/i;

export default handler;
