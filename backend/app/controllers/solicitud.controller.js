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
      rutEmpresa: datos.rutEmpresa,
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
module.exports = {
  crearSolicitud,
};
