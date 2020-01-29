const { io } = require('../server')
const { TicketControl } = require('../classes/ticket-control');

async function main() {
    let ticket1 = await TicketControl.getLastTicket();


    io.on('connection', (client) => {
        console.log('Usuario conectado');

        client.on('disconnect', () => {
            console.log('Usuario desconectado');
        });

        client.on('nextTicket', async(data, callback) => {
            let resp = await ticket1.nextTicket();
            console.log(resp);
            callback(resp);
        });

        client.emit('actualTicket', {
            actual: ticket1.getActualTicket()
        });

        client.on('assignTicket', (data, callback) => {
            if (!data.escritorio) {
                return callback({
                    err: true,
                    mensaje: 'El escritorio es necesario'
                });
            }

            let ticket = ticket1.assignTicket(data.escritorio);

            callback(ticket);
        });

    });
}

main();