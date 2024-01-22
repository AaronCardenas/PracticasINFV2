const db = require("../models");
const jwt = require("jsonwebtoken");
const key = require("../config/const.js").JWT_SECRET;
const bcrypt = require("bcrypt");


const crearSolicitud = async (req, res) => {
  const { token,datos } = req.body;
  const { rut } = jwt.verify(token, key);
  try {
    const solicitud = await db.solicitud.create({
      idSolicitud: datos.idSolicitud,
      rut: rut,
      rutsolicitud: datos.rutsolicitud,
      fechaSolicitud: datos.fechaSolicitud,
      numeroPractica: datos.numeroPractica,
      fase: datos.fase,
    });

    return res.status(200).json({
      message: "Solicitud creado exitosamente.",
      solicitud: solicitud,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error al crear solicitud.",
      error: err,
    });
  }
};

const allSolicitud = async (req, res) => {
  try {
      const solicitudes = await db.solicitud.findAll({
          attributes: ['idSolicitud', 'rut', 'rutEmpresa', 'fechaSolicitud', 'numeroPractica', 'fase']
      });

      return res.status(200).json({
          message: "Solicitudes listadas exitosamente.",
          solicitudes: solicitudes
      });
  } catch (err) {
      return res.status(500).json({
          message: "Error al listar solicitudes.",
          err
      });
  }
};
const allestSolicitud = async (req, res) => {
  const { token } = req.body;
  const { rut } = jwt.verify(token, key);
  try {
    const solicitudes = await db.solicitud.findAll({
      attributes: ['idSolicitud', 'rut', 'rutEmpresa', 'fechaSolicitud', 'numeroPractica', 'fase'],
      where: {
        rut: rut,
      },
    });

      return res.status(200).json({
          message: "Solicitudes listadas exitosamente.",
          solicitudes: solicitudes
      });
  } catch (err) {
      return res.status(500).json({
          message: "Error al listar solicitudes.",
          err
      });
  }
};
module.exports = {
  crearSolicitud,
  allSolicitud,
  allestSolicitud
};
