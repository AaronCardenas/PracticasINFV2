import express from 'express';
import cors from 'cors';

import value from './utils/const.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(express.json());

// Opciones de CORS
const corsOptions = {
    credentials: true,
    optionSuccessStatus:200,
    methods: "GET, PUT, POST, DELETE, OPTIONS",
    origin: 'http://localhost:3000'
};

// Configuración
app.set('port', value.RUN_PORT); //puerto de escucha
app.set('env', value.NODE_ENV); //entorno de ejecucion

// Middlewares
app.use(cors(corsOptions)); //Ingresa configuracion de CORS


// Ejecucuión del servidor
app.listen(value.RUN_PORT, function () {
    console.log("Server listening at: " + value.RUN_PORT);
  });

export default app; 