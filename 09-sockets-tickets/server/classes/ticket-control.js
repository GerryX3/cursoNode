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


    static getLastTicket() {
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

    getActualTicket() {
        if (!this.ultimo) {
            this.ultimo = new Ticket(0, null);
        }
        return `Ticket ${this.ultimo.numero}`;
    }

    async assignTicket(desktop) {
        console.log(this);
        if (this.tickets.length === 0) {
            return `Noy tickets`
        }
        let ticket = this.tickets.shift();

        ticket.escritorio = desktop;
        console.log(ticket);
        await ticket.save();
        this.ultimos4.unshift(ticket);
        if (this.ultimos4.length > 4) {
            this.ultimos4.pop();
        }
        console.log('Ultimos: ', this.ultimos4);
        await this.save();

        return ticket;
    }

    async nextTicket() {
        this.ultimo = new Ticket(this.ultimo.numero + 1, null);
        await this.ultimo.save();
        this.tickets.push(this.ultimo);
        console.log('New Ticket :', this.tickets[0]);
        let resp = await this.save();
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