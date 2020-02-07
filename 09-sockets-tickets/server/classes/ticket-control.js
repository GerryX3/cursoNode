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
                .populate({path:'ultimo',model:'Ticket'})
                .populate({path:'tickets',model:'Ticket'})
                .populate({path:'ultimos4',model:'Ticket'})
                .exec(async(err, post) => {
                    if (err) {
                        reject(err);
                    }
                    if (post && _this.hoy === post.hoy) {
                        resolve(post);
                    } else {
                        let newTicketControl = await _this.save();
                        console.info('Se a inicializado el sistema');
                        resolve(newTicketControl);
                    }
                });

        })
    }

    async getUltimos4(){
        let ticket = await TicketControl.getLastTicket();
        return ticket.ultimos4;

    }

    async getActualTicket() {
        let ticket = await TicketControl.getLastTicket();
        return new Promise((resolve,reject)=>{
            TicketControl.populate(ticket,{path:'ultimo',model: 'Ticket'}, (err,ticketPopulated)=>{
                if(err){
                    reject(err)
                }else{
                    if(ticketPopulated.ultimo){
                        resolve(`Ticket ${ticketPopulated.ultimo.numero}`);
                    }else{
                        resolve(`Ticket 0`);
                    }
                }
            });
        });
    }

    async assignTicket(desktop) {
        let ticket = await TicketControl.getLastTicket();
        return new Promise(async (resolve,reject)=>{
            TicketControl.populate(ticket,[{path:'tickets',model: 'Ticket'},{path:'ultimos4',model: 'Ticket'}],async (err,ticketPopulated)=>{

                if(err){
                    reject(err);
                }else{
                    if (ticketPopulated.tickets.length === 0) {
                        resolve (`No hay tickets`)
                    }else{

                        let ticket = ticketPopulated.tickets.shift();
                
                        ticket.escritorio = desktop;
                        await ticket.save();
                        ticketPopulated.ultimos4.unshift(ticket);
                        if (ticketPopulated.ultimos4.length > 4) {
                            ticketPopulated.ultimos4.pop();
                        }
                        await ticketPopulated.save();
                
                        resolve(ticket);
                    }
                
                }

            
            });


        });
    }

    async nextTicket() {
        let ticket = await TicketControl.getLastTicket();
        return new Promise((resolve,reject)=>{
            TicketControl.populate(ticket,{path:'ultimo',model: 'Ticket'},async (err,tickedPopulated)=>{
                if(err){
                    reject(err);
                }else{
                    if(!tickedPopulated.ultimo){
                        tickedPopulated.ultimo = new Ticket(0, null);
                    }
                    tickedPopulated.ultimo = new Ticket(tickedPopulated.ultimo.numero + 1, null);
                    await tickedPopulated.ultimo.save();
                    tickedPopulated.tickets.push(tickedPopulated.ultimo);
                    await tickedPopulated.save();
                    resolve( `Ticket ${tickedPopulated.ultimo.numero}`);
                }

            });
            
        });
    }


    save() {
        return new Promise((resolve, reject) => {
            super.save((err, ticketSaved) => {
                if (err) {
                    reject(err);
                } else {
                    TicketControl.populate(ticketSaved,[{path:'ultimo',model: 'Ticket'},{path:'tickets',model: 'Ticket'}],(err,tickedPopulated)=>{
                        if(err){
                            reject(err);
                        }else{
                            resolve(tickedPopulated);
                        }
                    });
                }
            });
        });
    }



}



module.exports = {
    TicketControl
}