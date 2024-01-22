const router = require('express').Router();

const { crearSolicitud,allSolicitud,allestSolicitud} = require('../controllers/solicitud.controller.js');

//Ruta de prueba
router.get("/",(req,res)=>{
    res.json({message:"Ruta de /solicitud/ funcionando"});
});
// Ruta de validacion de empresa                // DATOS JSON: 
router.post("/crear",crearSolicitud);
router.get("/all",allSolicitud);
router.post("/allestSolicitud",allestSolicitud);
module.exports = router;