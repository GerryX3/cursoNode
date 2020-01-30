const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { Ticket } = require('../classes/ticket');


const ticketControlSchema = new Schema({
    ultimo: {
        type: Schema.Types.ObjectId,
        ref: 'Ticket',
        default: null
    },
    hoy: {
        type: Number,
        default: new Date().getDate()
    },
    tickets: {
        type: [Schema.Types.ObjectId],
        ref: 'Ticket',
        default: []
    },
    ultimos4: {
        type: [Schema.Types.ObjectId],
        ref: 'Ticket',
        default: []
    },
    created_at: {
        type: Date,
        default: new Date()
    }
});





class TicketControl extends mongoose.model('TicketControl', ticketControlSchema) {


    static async getLastTicket() {
        const _this = new TicketControl();
        return new Promise((resolve, reject) => {
            TicketControl.findOne()
                .sort({ 'created_at': -1 })
                .populate('ultimo')
                .populate('tickets')
                .exec(async(err, post) => {
                    if (err) {
                        reject(err);
                    }
                    if (post && _this.hoy === post.hoy) {
                        resolve(post);
                    } else {
                        _this.ultimo = new Ticket(0, null);
                        await _this.ultimo.save()
                        _this.save((err, ticketSaved) => {
                            if (err) {
                                reject(err);
                            } else {
                                console.info('Se a inicializado el sistema');
                                resolve(ticketSaved);
                            }
                        });
                    }
                });

        })
    }

    async getActualTicket() {
        let ticket = await TicketControl.getLastTicket();
        return `Ticket ${ticket.ultimo.numero}`;
    }

    async assignTicket(desktop) {
        let ticketControl = await TicketControl.getLastTicket();
        if (ticketControl.tickets.length === 0) {
            return `No hay tickets`
        }
        let ticket = ticketControl.tickets.shift();

        ticket.escritorio = desktop;
        console.log(ticket);
        await ticket.save();
        ticketControl.ultimos4.unshift(ticket);
        if (ticketControl.ultimos4.length > 4) {
            ticketControl.ultimos4.pop();
        }
        console.log('Ultimos: ', ticketControl.ultimos4);
        await ticketControl.save();

        return ticket;
    }

    async nextTicket() {
        let ticketControl = await TicketControl.getLastTicket();
        ticketControl.ultimo = new Ticket(this.ultimo.numero + 1, null);
        await ticketControl.ultimo.save();
        ticketControl.tickets.push(ticketControl.ultimo);
        let resp = await ticketControl.save();
        return resp;
    }


    save() {
        return new Promise((resolve, reject) => {
            super.save((err, ticketSaved) => {
                if (err) {
                    reject(err);
                } else {
                    if (!ticketSaved.ultimo) {
                        ticketSaved.ultimo = new Ticket(0, null);
                    }
                    resolve(`Ticket ${ticketSaved.ultimo.numero}`);
                }
            });
        });
    }



}



module.exports = {
    TicketControl
}