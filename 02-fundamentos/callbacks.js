// setTimeout(() => {
//     console.log('Hola Mundo');
// }, 3000);


let getUsuarioById = (id, callback) => {
    let usuario = {
        nombre: 'Gerardo',
        id
    }

    if (id == 20) {
        callback(`El usuario con id ${id} no existe en la base de datos`);
    } else {
        callback(null, usuario);
    }

};



getUsuarioById(10, (error, usuario) => {
    if (error) {
        return console.log(error);
    }
    console.log('Usuario en la base: ', usuario);
});