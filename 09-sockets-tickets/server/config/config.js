// =============================
//  Puerto
// =============================
process.env.PORT = process.env.PORT || 3000;

// =============================
//  Entorno
// =============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =============================
//  Vencimiento del Token
// =============================
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// =============================
//  Semilla de autenticación
// =============================
process.env.SEED = process.env.SEED || 'Este-es-el-seed-desarrollo';

// =============================
//  Base de datos
// =============================

let urlDB

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/tickets'
} else {
    urlDB = process.env.MONGO_URI
}

process.env.URLDB = urlDB;