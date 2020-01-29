const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    numero: {
        type: Number,
        default: 0
    },
    escritorio: {
        type: Number,
        default: 0
    }
});


class Ticket extends mongoose.model('Ticket', schema) {
    constructor(numero, escritorio) {
        super();
        this.numero = numero;
        this.escritorio = escritorio;
    }


    save() {
        return new Promise((resolve, reject) => {
            super.save((err, ticketSaved) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(ticketSaved);
                }
            });
        });
    }
}


module.exports = {
    Ticket
};