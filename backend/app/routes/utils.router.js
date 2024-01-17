const router = require('express').Router();

// Importacion de controladores (endpoints simples)
const { conversion } = require('../controllers/conversion.controller.js');

//Ruta de prueba
router.get("/",(req,res)=>{
    res.json({message:"Ruta de /utils/ funcionando"});
});

// Ruta de conversion                               // DATOS JSON:
router.post("/conversion",conversion);              // {count, razonSocial, direccion, region, rut, semestre, horas, numeroPractica, nombre1, nombre2, apellido1, apellido2}

module.exports = router;
