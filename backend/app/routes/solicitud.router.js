const router = require('express').Router();

const { faseSolicitud,verSolicitudesUsuario ,verSolicitudesAceptadasU,crearSolicitud} = require('../controllers/solicitud.controller.js');

//Ruta de prueba
router.get("/",(req,res)=>{
    res.json({message:"Ruta de /solicitud/ funcionando"});
});

// Ruta de validacion de usuario                    // DATOS JSON:
router.post("/crear",crearSolicitud);             // { rut, rutempresa, extension, numeroPractica }
router.put("/:id",faseSolicitud);             // {idSolicitud, fase, descripcionRechazo (puede ser nulo)}
router.post("/listaSolicitudes",verSolicitudesUsuario);  //{rut}
router.post("/SolicitudesAceptadas",verSolicitudesAceptadasU);  //{rut}

module.exports = router;
