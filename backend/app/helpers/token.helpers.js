const db = require("../models");
const jwt = require('jsonwebtoken');
const key = require('../config/const.js').JWT_SECRET;

const tokenBlacklist = new Set();

async function generateToken(usuario) {
    try {
        const token = await jwt.sign({
            rut: usuario.rut,
            tipoUsuario: usuario.tipoUsuario
        }, key, {
            expiresIn: '1d'
        });
        return token;
        
    } catch (error) {
        throw error;
    }   
};

async function blacklist(token) {
    try {
        if (typeof token !== 'string') {
            throw new Error('El token debe ser una cadena.');
        }

        const decoded = jwt.verify(token, key); // Verifica la firma del token
        
        if (decoded && decoded.rut) {
            tokenBlacklist.add(token);
            return true;
        }

        return false;
    } catch (error) {
        console.error('Error al procesar el token:', error);
        throw error;
    }
}



async function validarToken(token, tipoUsuario) {
    try {
        const usuario=await jwt.verify(token, key);
        if (!tokenBlacklist.has(token) && usuario.tipoUsuario == tipoUsuario) {
            return {
                message: "Usuario validado exitosamente.",
                Boolean: true,
                error: null
            };
        }
        return {
            message: "Usuario no validado.",
            Boolean: false,
            error: null
        };

    } catch (error) {
        return {
            message: "Usuario no validado.",
            Boolean: false,
            error: error
        };
    }
};



module.exports = {
    generateToken,
    validarToken,
    blacklist
};