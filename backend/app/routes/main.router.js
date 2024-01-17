// Creacion objeto router.
const router = require('express').Router();



// Importacion de Routers
// i.e const estudiantesRouter = require('./estudiantes.router.js');
// i.e app.use('/api/estudiantes', estudiantesRouter);

const utilsRouter = require('./utils.router.js');

module.exports = app => {

    app.use('/utils', utilsRouter);

}
