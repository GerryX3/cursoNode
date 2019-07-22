// let getNombre = async() => {
//     return 'Gerardo';
// };


let getNombre = () => {
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            resolve('Gerardo');
        }, 3000);


    });
}

let getSaludo = async() => {

    let nombre = await getNombre();

    return `Hola ${ nombre }`;
}


getSaludo().then((mensaje) => {
    console.log(mensaje)
}).catch((e) => {
    console.log(e);
});