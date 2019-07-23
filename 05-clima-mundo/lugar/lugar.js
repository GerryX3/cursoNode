const axios = require('axios');

const getLugarLatLng = async dir => {
    const encodeDir = encodeURI(dir);

    const instance = axios.create({
        baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${encodeDir}`,
        timeout: 1000,
        headers: { 'X-RapidAPI-Key': '5ccc2cc8c3msh24f79920512b50bp171971jsnddb82accab89' }
    });

    const resp = await instance.get();

    if (resp.data.Results.length === 0) {
        throw new Error(`No hay resultados para ${dir}`);
    }

    const data = resp.data.Results[0];

    const { name: direccion, lat, lon: lng } = data;

    return {
        direccion,
        lat,
        lng
    };
};


module.exports = {
    getLugarLatLng
};