const router = require('express').Router();
const axios = require('axios');

const {
  faseSolicitud,
  verSolicitudesUsuario,
  verSolicitudesAceptadasU,
  crearSolicitud,
  allSolicitudesCoo,
  allSolicitudesJefe,
  allSolicitudesSec,
  readyAlumno,
  readySupervisor,
  actualizarFase,
  supXest,
  fechaauto,
  eliminarSolicitud,
} = require('../controllers/solicitud.controller.js');

//Ruta de prueba
router.get('/', (req, res) => {
  res.json({ message: 'Ruta de /solicitud/ funcionando' });
});

// Ruta de validacion de usuario                                // DATOS JSON:
router.post('/crear', crearSolicitud); // { rut, rutempresa, extension, numeroPractica ,}
router.put('/:id', faseSolicitud); // {fase, descripcionRechazo (puede ser nulo)}
router.post('/listaSolicitudes', verSolicitudesUsuario); // {rut}
router.post('/SolicitudesAceptadas', verSolicitudesAceptadasU); // {rut}
router.get('/allSolicitudesCoo', allSolicitudesCoo);
router.get('/allSolicitudesJefe', allSolicitudesJefe);
router.get('/allSolicitudesSec', allSolicitudesSec);
router.post('/readyAlumno', readyAlumno); // {idSolicitud}
router.post('/readySupervisor', readySupervisor);
router.put('/actualizar/:id', actualizarFase); // {idSolicitud, nroFase}
router.post('/supXest', supXest); // {rutSupervisor, rutEstudiante}
router.post('/eliminar', eliminarSolicitud); // {idSolicitud}
router.get('/fechaauto', fechaauto);

module.exports = router;
// const app = express();
const port = 3000;
async function hacerSolicitud() {
  try {
    const respuesta = await axios.get('http://localhost:3001/solicitud/fechaauto');
    // console.log('Respuesta:', respuesta.data);
  } catch (error) {
    console.error('Error al hacer la solicitud:', error.message);
  }
}
const intervalo = 3600*12*1000;
function solicitarAutomaticamente() {
  hacerSolicitud();
  setTimeout(solicitarAutomaticamente, intervalo);
}
solicitarAutomaticamente();
