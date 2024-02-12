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
    readySupervisor,
    actulizarFase,
    supXest
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
router.post("/readyAlumno", readyAlumno);                        // {idSolicitud}
router.post("/readySupervisor", readySupervisor); 
router.put("/actualizar/:id", actulizarFase);               // {idSolicitud, nroFase}
router.post("/supXest", supXest);                               // {rutSupervisor, rutEstudiante}


module.exports = router;
