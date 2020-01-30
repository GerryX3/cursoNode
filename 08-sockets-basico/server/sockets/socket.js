const { io } = require('../server')

io.on('connection', (client) => {
    console.log('Usuario conectado');

    client.emit('sendMsg', {
        usuario: 'Admin',
        msg: 'Bienvenido'
    });

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    client.on('sendMsg', (data, callback) => {
        console.log(data);

        client.broadcast.emit('sendMsg', data);

        // if (msg.usuario) {
        //     callback({
        //         resp: 'TODO BIEN!'
        //     });
        // } else {
        //     callback({
        //         resp: 'TODO MAL!!!!!!'
        //     });
        // }
    });
});