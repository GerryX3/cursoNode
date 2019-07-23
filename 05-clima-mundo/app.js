const { argv } = require('./config/yargs');
const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');


const getInfo = async(direccion) => {

    try {

        const coords = await lugar.getLugarLatLng(direccion);
        const temp = await clima.getClima(coords.lat, coords.lng);

        return temp;

    } catch (error) {
        throw new Error(`No se pudo determinar el clima de ${argv.direccion}`);
    }

}

getInfo(argv.direccion)
    .then((resp) => {
        console.log(`El clima en ${argv.direccion} es de ${resp}°C`);
    })
    .catch((err) => {
        console.log(err);
    });