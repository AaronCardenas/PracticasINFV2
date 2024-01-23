const db = require("../models");
const jwt = require('jsonwebtoken');
const key = require('../config/const.js').JWT_SECRET;
const bcrypt = require('bcrypt');

const loginSupervisor = async (req,res,next) => {

        const { rutEmpresa, password} = req.body;

        const supervisor = await db.supervisor.findOne({where:{rutEmpresa:rutEmpresa}}); // Asumiendo que solo hay un supervisor por empresa. Cambiara una vez se implemente el signup y login correspondientes.

        
        

};