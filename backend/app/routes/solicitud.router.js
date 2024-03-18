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
  agregarSup,
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
router.post('/addSup', agregarSup); // { token, idSolicitud, correoSupervisor }

async function hacerSolicitud() {
  try {
    console.log('Haciendo solicitud');
    const respuesta = await axios.get(
      'http://localhost:3001/solicitud/fechaauto'
    );
    // console.log('Respuesta:', respuesta.data);
  } catch (error) {
    console.error('Error al hacer la solicitud:', error.message);
  }
}

const intervalo = 60000; // 24 horas
async function iniciarApp() {
  try {
    await sequelize.sync(); // Sincroniza todos los modelos con la base de datos
    console.log('\n\n\nBase de datos sincronizada\n\n\n');
    solicitarAutomaticamente(); // Comienza a realizar solicitudes automáticamente
  } catch (error) {
    console.error('Error al iniciar la aplicación:', error.message);
  }
}

function solicitarAutomaticamente() {
  hacerSolicitud();
  setInterval(solicitarAutomaticamente, intervalo);
}

iniciarApp();
module.exports = router;
