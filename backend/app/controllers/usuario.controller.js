const db = require("../models");
const jwt = require('jsonwebtoken');
const key = require('../config/const.js').JWT_SECRET;
const bcrypt = require('bcrypt');


const validarUsuario = async (req,res,next) => {

    const {rut, password} = req.body;

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
            const token = jwt.sign({rut: rut, tipoUsuario: usuario.tipoUsuario}, key, {expiresIn: '1h' });
            
            // Envio de respuesta
            res.status(200).json({
                message:"Usuario validado exitosamente.",
                token:token
            });

        // Despues buscar por tipoUsuario 
        }
        // Password incorrecto
        else{

            res.status(404).json({
                message:"Clave o RUT incorrectos. (password incorrecto)"
            });
        }
    }
};

// Por ahora para cualquiera, coordinadores, supervisores y jefe de carrera. se definiran despues. Solo para estudiantes.
const crearUsuario = async (req,res) => {
    
    const {rut, password, telefono, correo, direccion, planEstudio, ingreso, tipoUsuario, nombre1, nombre2, apellido1, apellido2, } = req.body;

    const usuarioCheck = await db.usuario.findOne({where:{rut:rut}});

    if(usuarioCheck){
        return res.status(400).json({
            message:"El usuario ya existe."
        });
    }

    try{

        const usuario = await db.usuario.create({
            rut: rut,
            password: password,
            telefono: telefono,
            correo: correo,
            direccion: direccion,
            planEstudio: planEstudio,
            ingreso: ingreso,
            tipoUsuario: tipoUsuario,
            nombre1: nombre1,
            nombre2: nombre2,
            apellido1: apellido1,
            apellido2: apellido2,
        });

        return res.status(200).json({
            message:"Usuario creado exitosamente.",
            usuario:usuario
        });
    }
    catch(err){
        return res.status(500).json({
            message:"Error al crear usuario.",
            error:err
        });
    }
    
};

const verDatosUsuario = async (req,res) => {

    const {rut} = req.body;

    const usuario = await db.usuario.findOne({where:{rut:rut}});

    if(!usuario){
        return res.status(404).json({
            message:"Usuario no encontrado."
        });
    }

    return res.status(200).json({
        message:"Usuario encontrado.",
        usuario:usuario
    });
};

module.exports = {
    validarUsuario,
    crearUsuario,
    verDatosUsuario
};