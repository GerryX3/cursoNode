var socket = io();

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
var label = $('small');


$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {
    socket.emit('assignTicket', { escritorio: escritorio }, function(resp) {
        console.log(resp);
    });
});