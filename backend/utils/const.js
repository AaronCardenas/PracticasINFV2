import 'dotenv/config.js';

// Valores de configuración node/express
const RUN_PORT = process.env.RUN_PORT || 3000;
const NODE_ENV = process.env.NODE_ENV;

// Valores de configuración de la base de datos
const BD_HOST = process.env.BD_HOST;
const BD_USER = process.env.BD_USER;
const BD_PASS = process.env.BD_PASS;
const DATABASE = process.env.DATABASE;

const object = {
    RUN_PORT,
    NODE_ENV,
    BD_HOST,
    BD_USER,
    BD_PASS,
    DATABASE
};

Object.freeze(object);

export default object;