const fs = require('fs');
const colors = require('colors');


let getTabla = (base, max) => {
    let data = '';
    for (let i = 1; i <= max; i++) {
        data += `${base} * ${i} = ${base*i}\n`;
    }
    return data;
}



let crearTabla = (base, limite) => {

    return new Promise((resolve, reject) => {

        if (!Number(base)) {
            reject(`El valor ${base} no es un número`);
            return;
        }

        if (!Number(limite)) {
            reject(`El valor ${limite} no es un número`);
            return;
        }

        let data = getTabla(base, limite);

        fs.writeFile(`tablas/tabla-del-${base}-hasta-el-${limite}.txt`, data, (err) => {
            if (err) {
                reject(err);
            } else {

                resolve(`tabla-del-${base}-hasta-el-${limite}.txt`);
            }
        });
    });

}


let listarTabla = (base, limite) => {


    if (!Number(base)) {
        throw new Error(`El valor ${base} no es un número`);
    }

    if (!Number(limite)) {
        throw new Error(`El valor ${limite} no es un número`);
    }

    let data = getTabla(base, limite);

    console.log(`
    ==============================\n
    Tabla del ${base} al ${limite}\n
    ==============================
    `.green);

    console.log(data);

}


module.exports = {
    crearTabla,
    listarTabla
};