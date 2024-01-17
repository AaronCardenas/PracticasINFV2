const router = require('express').Router();

// Importacion de controladores (endpoints simples)
const { conversion } = require('../controllers/conversion.controller.js');

//Ruta de prueba
router.get("/",(req,res)=>{
    res.json({message:"Ruta de /utils/ funcionando"});
});

// Ruta de conversion
router.post("/conversion",conversion);

module.exports = router;

