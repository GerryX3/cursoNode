const { argv } = require('yargs')
    .option({
        direccion: {
            alias: 'd',
            desc: 'Dirección de la ciudad para obtener el clima',
            demand: true
        }
    });


module.exports = {
    argv
}