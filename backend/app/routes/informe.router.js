const router = require('express').Router();

const { crearInforme } = require('../controllers/informe.controller.js');

//Ruta de prueba
router.get("/",(req,res)=>{
	res.json({message:"Ruta de /supervisor/ funcionando"});
});

router.post("/crear",crearInforme); // {idSolicitud,documento,fechaEnvio};

module.exports = router;