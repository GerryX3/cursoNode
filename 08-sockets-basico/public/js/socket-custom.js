var socket = io();

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});


socket.emit('sendMsg', {
    usuario: 'luis',
    msg: 'Hola mundo'
}, function(resp) {
    console.log(resp);
});

socket.on('sendMsg', function(msg) {
    console.log(msg);
});