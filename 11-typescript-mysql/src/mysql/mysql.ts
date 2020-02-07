import mysql from 'mysql';


export default class MySQL{


    private static _instance: MySQL;

    cnn: mysql.Connection;
    connected:Boolean = false;

    public static get instance(){
            return this._instance || (this._instance = new this());
    }


    private constructor(){
        console.log('Clase inicializada');

        this.cnn = mysql.createConnection({
            host:'localhost',
            user:'node_user',
            password: '123456',
            database: 'node_db'
        });

        this.connect();
    }

    static exec(query:string, callback:Function){
        this.instance.cnn.query(query,(err,results:Object[],fields)=>{

            if(err){
                console.log(err);
                callback(err);
                return;
            }
            if(results.length === 0){
                callback('El registro no existe');
            }else{
                callback(null,results);
            }


        })
    }


    private connect(){
        this.cnn.connect((err:mysql.MysqlError)=>{
            if(err){
                console.error(err.message);
                return;
            }

            this.connected = true;
            console.log('Base de datos Online');

        });
    }
}