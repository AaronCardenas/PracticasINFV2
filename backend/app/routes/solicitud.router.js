const router = require('express').Router();

const { faseSolicitud, verSolicitudesUsuario, verSolicitudesAceptadasU, crearSolicitud, allSolicitudes } = require('../controllers/solicitud.controller.js');

//Ruta de prueba
router.get("/",(req,res)=>{
    res.json({message:"Ruta de /solicitud/ funcionando"});
});

// Ruta de validacion de usuario                                // DATOS JSON:
router.post("/crear",crearSolicitud);                           // { rut, rutempresa, extension, numeroPractica }
router.put("/:id",faseSolicitud);                               // {fase, descripcionRechazo (puede ser nulo)}
router.post("/listaSolicitudes",verSolicitudesUsuario);         // {rut}
router.post("/SolicitudesAceptadas",verSolicitudesAceptadasU);  // {rut}
router.get("/allSolicitudes",allSolicitudes);                   

module.exports = router;
