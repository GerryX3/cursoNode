const basicOpts = {
    descripcion: {
        alias: 'd',
        demand: true,
        desc: 'Descripción de la tarea por hacer'
    }
};

const { argv } = require('yargs')
    .command('listar', 'Lista las tareas creadas', {
        completado: {
            alias: 'c',
            desc: 'Marca como completado o pendiente la tarea'
        }
    })
    .command('crear', 'Crea un elemento por hacer', basicOpts)
    .command('borrar', 'Elimina una tarea', basicOpts)
    .command('actualizar', 'Actualiza el estado completado de una tarea', {
        ...basicOpts,
        completado: {
            alias: 'c',
            default: true,
            desc: 'Marca como completado o pendiente la tarea'
        }
    })
    .help();

module.exports = {
    argv
};