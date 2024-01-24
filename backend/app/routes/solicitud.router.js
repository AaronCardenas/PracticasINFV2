const router = require('express').Router();

const { 
    faseSolicitud,
    verSolicitudesUsuario,
    verSolicitudesAceptadasU,
    crearSolicitud,
    allSolicitudesCoo,
    allSolicitudesJefe,
    allSolicitudesSec,
    readyAlumno,
    readySupervisor
} = require('../controllers/solicitud.controller.js');

//Ruta de prueba
router.get("/",(req,res)=>{
    res.json({message:"Ruta de /solicitud/ funcionando"});
});

// Ruta de validacion de usuario                                // DATOS JSON:
router.post("/crear",crearSolicitud);                           // { rut, rutempresa, extension, numeroPractica }
router.put("/:id",faseSolicitud);                               // {fase, descripcionRechazo (puede ser nulo)}
router.post("/listaSolicitudes",verSolicitudesUsuario);         // {rut}
router.post("/SolicitudesAceptadas",verSolicitudesAceptadasU);  // {rut}
router.get("/allSolicitudesCoo",allSolicitudesCoo);             
router.get("/allSolicitudesJefe",allSolicitudesJefe);           
router.get("/allSolicitudesSec",allSolicitudesSec);
router.put("/readyAlumno", readyAlumno);                        // {idSolicitud}
router.put("/readySupervisor", readySupervisor);                // {idSolicitud}


module.exports = router;
