const router = require('express').Router();

const { validarUsuario } = require('../controllers/usuario.controller.js');

//Ruta de prueba
router.get("/",(req,res)=>{
    res.json({message:"Ruta de /usuario/ funcionando"});
});

// Ruta de validacion de usuario
router.post("/validar",validarUsuario);

module.exports = router;