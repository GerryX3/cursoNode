var socket = io();

socket.on('connect', function() {
    console.log('Conectado al servidor');

});

socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

var ticket1 = $('#lblTicket1');
var ticket2 = $('#lblTicket2');
var ticket3 = $('#lblTicket3');
var ticket4 = $('#lblTicket4');

var escritorio1 = $('#lblEscritorio1');
var escritorio2 = $('#lblEscritorio2');
var escritorio3 = $('#lblEscritorio3');
var escritorio4 = $('#lblEscritorio4');

var escritorios = [escritorio1,escritorio2,escritorio3,escritorio4];
var tickets = [ticket1, ticket2, ticket3, ticket4];
    
socket.on('actualTicket', function(data) {
    actualizaHTML(data.ultimos4);    
});

socket.on('ultimos4',function(data) {


    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();

    actualizaHTML(data.ultimos4);    
});


function actualizaHTML(ultimos4){
    for(var i = 0; i < ultimos4.length;i++){
        tickets[i].text('Ticket '+ ultimos4[i].numero);
        escritorios[i].text('Escritorio '+ultimos4[i].escritorio);
    }
}