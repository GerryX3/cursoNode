import express = require('express');
import path = require('path');




export default class Server{


    public app: express.Application;
    public port: Number;

    constructor(port:Number){
        this.port = port;
        this.app = express();
    }

    static init(port: Number){
        return new Server(port);
    }

    private pucblicFolder(){
        const publicPath = path.resolve(__dirname, '../public');

        this.app.use(express.static(publicPath));
    }

    start(callback:(...args: any[]) => void){
        this.app.listen(this.port, callback);
        this.pucblicFolder();
    }

}