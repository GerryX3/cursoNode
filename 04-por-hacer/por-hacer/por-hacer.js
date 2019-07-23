const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {

    return new Promise((resolve, reject) => {

        let data = JSON.stringify(listadoPorHacer);

        fs.writeFile('./db/data.json', data, (err) => {
            if (err) {
                reject(err);
                return;
            } else {
                resolve('Base actualizada!');
            }
        })

    });


}

const cargarDB = () => {

    try {

        listadoPorHacer = require('../db/data.json');

    } catch (error) {

        listadoPorHacer = [];

    }

}

const crear = async(descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    console.log(await guardarDB());

    return porHacer;
}

const getLista = (completado) => {
    cargarDB();
    if (completado !== undefined) {
        return listadoPorHacer.filter((tarea) => tarea.completado == completado);
    } else {
        return listadoPorHacer;
    }

}

const actualizar = async(descripcion, completado = true) => {

    cargarDB();

    let index = listadoPorHacer.findIndex((tarea) => tarea.descripcion === descripcion);

    if (index != -1) {
        listadoPorHacer[index].completado = completado;
        console.log(await guardarDB());
        return index;
    } else {
        throw new Error(`No se encontró la tarea con descripción ${descripcion}`);
    }

}

const borrar = async(descripcion) => {

    cargarDB();

    let newListadoPorHacer = listadoPorHacer.filter((tarea) => tarea.descripcion !== descripcion);

    if (newListadoPorHacer.length != listadoPorHacer.length) {
        listadoPorHacer = newListadoPorHacer;
        console.log(await guardarDB());
        return descripcion;
    } else {
        throw new Error(`No se encontró la tarea con descripción ${descripcion}`);
    }

}


module.exports = {
    crear,
    getLista,
    actualizar,
    borrar
};