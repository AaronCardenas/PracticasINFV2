const router = require('express').Router();

const { validarUsuario, crearUsuario, verDatosUsuario } = require('../controllers/usuario.controller.js');

//Ruta de prueba
router.get("/",(req,res)=>{
    res.json({message:"Ruta de /usuario/ funcionando"});
});

// Ruta de validacion de usuario                    // DATOS JSON:
router.post("/validar",validarUsuario);             // {rut, password}
router.post("/crear",crearUsuario);                 // {rut, password, telefono, correo, direccion, planEstudio, ingreso, tipoUsuario, nombre1, nombre2, apellido1, apellido2}
router.post("/verDatos",verDatosUsuario);           // {rut}

module.exports = router;
