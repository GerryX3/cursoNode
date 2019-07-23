const axios = require('axios');

const getClima = async(lat, lng) => {
    const resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=6d5a92686ab162c17d8576330a7a143e&units=metric`);

    return resp.data.main.temp;
};

module.exports = {
    getClima
};