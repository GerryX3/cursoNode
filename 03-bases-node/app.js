const { crearTabla, listarTabla } = require('./multiplicar/multiplicar');
const { argv } = require('./config/yargs');
const colors = require('colors/safe');



let comando = argv._[0];

switch (comando) {

    case 'listar':
        listarTabla(argv.base, argv.limite);
        break;
    case 'crear':
        crearTabla(argv.base, argv.limite)
            .then((nombreArchivo) => { console.log(`Archivo creado: ${colors.green(nombreArchivo)}`); })
            .catch((err) => { console.log(err); });
        break;
    default:
        console.log('Comando no reconocido.');

}