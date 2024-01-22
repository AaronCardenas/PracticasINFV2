const router = require('express').Router();

const { crearSolicitud,allSolicitud} = require('../controllers/solicitud.controller.js');

//Ruta de prueba
router.get("/",(req,res)=>{
    res.json({message:"Ruta de /solicitud/ funcionando"});
});
// Ruta de validacion de empresa                // DATOS JSON: 
router.post("/crear",crearSolicitud);
router.get("/all",allSolicitud);

module.exports = router;