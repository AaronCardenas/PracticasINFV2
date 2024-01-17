const db = require("../models");
const jwt = require('jsonwebtoken');
const key = require('../config/const.js').JWT_SECRET;


const validarUsuario = async (req,res,next) => {

    const {rut, password} = req.body;
    console.log(req.body);
    console.log(rut);
    console.log(password);
    const usuario = await db.usuario.findOne({where:{rut:rut}});
    // No existe usuario
    if(!usuario){

        return res.status(404).json({
            message:"Clave o RUT incorrectos (No existe)."
        });
    // Caso usuario existe
    }else{
        // Password correcto
        if(usuario.password === password){

            // Generacion del token
            const token = jwt.sign({rut:rut, tipoUsuario:usuario.tipoUsuario}, key, {expiresIn:'1h'});
            
            // Envio de respuesta
            res.status(200).json({
                message:"Usuario validado exitosamente.",
                token:token
            });
        }
        // Password incorrecto
        else{

            res.status(404).json({
                message:"Clave o RUT incorrectos. (password incorrecto)"
            });
        }
    }
};

// Pendiente. Funcion dummy
const crearUsuario = async (req,res) => {
    
        const {rut,nombre,correo,telefono,contrasena} = req.body;
        const usuario = await db.usuario.create({rut:rut,nombre:nombre,correo:correo,telefono:telefono,contrasena:contrasena});
        res.status(200).json({message:"Usuario creado exitosamente",usuario:usuario});
    
};

module.exports = {
    validarUsuario,
    crearUsuario
};