const db = require("../models");

const tokenfunc = require('../helpers/token.helpers.js');
const key = require('../config/const.js').JWT_SECRET;
const jwt = require('jsonwebtoken');

// TO-DO: Implementar seguridad de passwords, requiere implementacion en front y back. (Hashing, salting, etc.)

const logout = async (req,res) => {
    const token = req.body.token.toString();
    if (token){
        try {
            const response = await tokenfunc.blacklist(token);
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
};

const login = async (req, res) => {
    try {
      const { rut, password } = req.body;
  
      const usuario = await db.usuario.findOne({ where: { rut: rut } });
  
      if (!usuario) {
        return res.status(404).json({ message: "Credenciales incorrectas (No existe)." });
      }
  
      const passwordCorrecto = usuario.password === password;
  
      if (passwordCorrecto) {
        const token = await tokenfunc.generateToken(usuario);
        return res.status(200).json({
          message: "Usuario validado exitosamente.",
          token: token
        });
      } else {
        return res.status(404).json({ message: "Credenciales incorrectas (Contraseña incorrecta)." });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error interno del servidor." });
    }
};

const crearUsuario = async (req, res) => {
  const {
    rut,
    password,
    telefono,
    correo,
    direccion,
    planEstudio,
    ingreso,
    tipoUsuario,
    nombre1,
    nombre2,
    apellido1,
    apellido2,
  } = req.body;

  const usuarioCheck = await db.usuario.findOne({ where: { rut: rut } });

  if (usuarioCheck) {
    return res.status(400).json({
      message: "El usuario ya existe.",
    });
  }

  try {
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
      message: "Usuario creado exitosamente.",
      usuario: usuario,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error al crear usuario.",
      error: err,
    });
  }
};
const validarUsuario = async (req,res) => {             // Para que se usara a comparacion del login?
    const {token,tipoUsuario} = req.body;
    if (token){
        try {
            const validartoken = await tokenfunc.validarToken(token,tipoUsuario);
            return res.status(200).json(validartoken);
        } catch (error) {
            return res.status(500).json(validarUsuario);
        }

    }
};
const getdata = async (req, res) => {
  const { token } = req.body;
  try {
    const { rut } = jwt.verify(token, key);
    const usuario = await db.usuario.findOne({ where: { rut: rut } ,attributes: { exclude: ['password'] },});

    if (!usuario) {
      return res.status(404).json({
        message: "No se encontró el usuario.",
      });
    }

    return res.status(200).json({
      message: "Datos del usuario obtenidos exitosamente.",
      usuario: usuario,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Error al obtener datos del usuario.",
      error: err,
    });
  }
};


const verDatosUsuario = async (req,res) => {
    const {token} = req.body;
    const {rut} = await jwt.verify(token, key);
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
    verDatosUsuario,
    login,
    logout
};