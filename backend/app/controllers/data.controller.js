const db = require("../models");
const jwt = require('jsonwebtoken');
const key = require('../config/const.js').JWT_SECRET;
const { conversion } = require('./conversion.controller.js');


exports.unirDatos = async (req,res) => {
    const { rutUsuario, rutEmpresa } = req.body;
    const usuario = await db.usuario.findOne({where:{rut:rutUsuario}});
    const empresa = await db.empresa.findOne({where:{rutEmpresa:rutEmpresa}});
    console.log(usuario);
    console.log(empresa);

    const datosFormatoJSON = {
          count: 3,
          razonSocial: empresa.razonSocial,
          direccion: empresa.direccion,
          region : empresa.region,
          rut: usuario.rut,
          semestre: 2,
          horas: 320,
          numeroPractica: "segunda",
          nombre1: usuario.nombre1,
          nombre2: usuario.nombre2,
          apellido1: usuario.apellido1,
          apellido2: usuario.apellido2,
      };
      await conversion({ body: datosFormatoJSON }, res);
};
