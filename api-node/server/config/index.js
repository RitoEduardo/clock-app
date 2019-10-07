// =================================
//  Puerto
// =================================
process.env.PORT = process.env.PORT || 4000;

// =================================
//  Entorno
// =================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =================================
//  Nombre de la base de Datos
// =================================
process.env.DATABASE = process.env.DATABASE || 'test_api'

// =================================
//  Base de datos
// =================================
let mongoDB = "";
if (process.env.NODE_ENV === 'dev') {
    mongoDB = `mongodb://localhost:27017/${ process.env.DATABASE }`;
} else {
    //...
}

process.env.MONGO_DB = mongoDB;