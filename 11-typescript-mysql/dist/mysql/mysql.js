"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
class MySQL {
    constructor() {
        this.connected = false;
        console.log('Clase inicializada');
        this.cnn = mysql_1.default.createConnection({
            host: 'localhost',
            user: 'node_user',
            password: '123456',
            database: 'node_db'
        });
        this.connect();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    static exec(query, callback) {
        this.instance.cnn.query(query, (err, results, fields) => {
            if (err) {
                console.log(err);
                callback(err);
                return;
            }
            if (results.length === 0) {
                callback('El registro no existe');
            }
            else {
                callback(null, results);
            }
        });
    }
    connect() {
        this.cnn.connect((err) => {
            if (err) {
                console.error(err.message);
                return;
            }
            this.connected = true;
            console.log('Base de datos Online');
        });
    }
}
exports.default = MySQL;
