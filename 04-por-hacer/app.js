const { argv } = require('./config/yargs');
const Colors = require('colors/safe');
const porHacer = require('./por-hacer/por-hacer');

let comando = argv._[0];

switch (comando) {
    case 'crear':
        porHacer
            .crear(argv.descripcion)
            .then(tarea => {
                console.log(tarea);
            })
            .catch(err => {
                console.log(err);
            });
        break;

    case 'listar':

        if (argv.completado != undefined && Boolean(argv.completado)) {
            argv.completado = argv.completado == 'true' ? true : false;
        } else if (argv.completado != undefined) {
            console.log(Colors.red('Completado debe ser Booleano'));
            return;
        }

        let lista = porHacer.getLista(argv.completado);

        if (lista.length === 0) {
            console.log(Colors.green('==========Sin resultados=========='));
        }

        for (const tarea of lista) {
            console.log(Colors.green('==========Por Hacer=========='));
            console.log(tarea.descripcion);
            console.log('Estado: ', tarea.completado);
            console.log(Colors.green('============================='));
        }

        break;

    case 'actualizar':
        if (Boolean(argv.completado)) {
            argv.completado = argv.completado + '' == 'true' ? true : false;
        } else {
            console.log(Colors.red('Completado debe ser Booleano'));
            return;
        }

        porHacer
            .actualizar(argv.descripcion, argv.completado)
            .then(index => {
                console.log(`Se actualizó la tarea con el index: ${index}`);
            })
            .catch(err => {
                console.log(err);
            });

        break;

    case 'borrar':
        porHacer
            .borrar(argv.descripcion)
            .then((descripcion) => {
                console.log(`Se elimino la tarea con la descripción: ${descripcion}`);
            })
            .catch(err => {
                console.log(err);
            });

        break;

    default:
        console.log('Comando no reconocido');
        break;
}