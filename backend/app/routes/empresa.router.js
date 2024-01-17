const router = require('express').Router();

const { validarEmpresa, crearEmpresa, listarEmpresas } = require('../controllers/empresa.controller.js');

//Ruta de prueba
router.get("/",(req,res)=>{
    res.json({message:"Ruta de /empresa/ funcionando"});
});

// Ruta de validacion de empresa                // DATOS JSON: 
router.post("/validar",validarEmpresa);         // { "razonSocial": "nombreEmpresa" } 

//Ruta de creacion de Empresa
router.post("/crear",crearEmpresa);             // {rutEmpresa, razonSocial, ciudad, region, direccion, rubro}

// Rutas de listado de empresas
router.get("/listar",listarEmpresas);

module.exports = router;