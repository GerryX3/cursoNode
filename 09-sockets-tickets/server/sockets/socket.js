const { io } = require('../server')
const { TicketControl } = require('../classes/ticket-control');

async function main() {
    let ticket1 = await TicketControl.getLastTicket();


    io.on('connection', async(client) => {
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
            actual: await ticket1.getActualTicket(),
            ultimos4: await ticket1.getUltimos4()
        });

        client.on('assignTicket', async (data, callback) => {
            if (!data.escritorio) {
                return callback({
                    err: true,
                    mensaje: 'El escritorio es necesario'
                });
            }

            let ticket = await ticket1.assignTicket(data.escritorio);

            callback(ticket);

            client.broadcast.emit('ultimos4', {
                actual: await ticket1.getActualTicket(),
                ultimos4: await ticket1.getUltimos4()
            });
        });

    });
}

main();