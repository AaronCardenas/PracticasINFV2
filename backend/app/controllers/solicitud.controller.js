const db = require("../models");
const key = require('../config/const.js').JWT_SECRET;
const jwt = require('jsonwebtoken');
const Op = db.Sequelize.Op;

const supXest = async (req, res) => {
  try {

      const { token } = req.body;
      const usuario = await jwt.verify(token, key);

      const supervisor = await db.supervisor.findOne(
          {where: { correoSupervisor : usuario.correoSupervisor }}
      );
      
      const solicitudes = await db.solicitud.findAll(
          {where: { correoSupervisor: supervisor.correoSupervisor }}
      );

      return res.status(200).json({
          message: "Solicitudes encontradas exitosamente",
          solicitudes
      });

      /*
        const empresa = await db.empresa.findOne(
          {where: { rutEmpresa : supervisor.rutEmpresa }}
        );
      const practicantes = await db.solicitud.findAll(
          {where: { rutEmpresa:empresa.rutEmpresa }}
        );
      return res.status(200).json({
          message: "Solicitudes listadas exitosamente",
          practicantes
      });
      */
  } catch (err) {
      return res.status(500).json({
          err
      });
  }
};

const crearSolicitud = async (req, res) => {
  const { token, datos } = req.body;
  const { rut } = jwt.verify(token, key);
  const numeroPractica = datos.numeroPractica;
  const solicitudCalificada = await db.solicitud.findOne({
    where: { rut, fase: 5, numeroPractica }, // En entero, la fase calificada es 5
  });
  const solicitudAceptada = await db.solicitud.findOne({
    where: { rut, fase: 3, numeroPractica }, // En entero, la fase aceptada es 3
  });
  const solicitudPracticaAnteriorNoTerminada = await db.solicitud.findOne({
    where: { rut, fase: { [Op.not]: 5 }, numeroPractica: numeroPractica - 1 }, // Revisar
  });

  if (solicitudCalificada) {
    return res.status(409).json({
      message: "Ya se ha realizado esta práctica profesional",
    });
  } else if (solicitudAceptada) {
    return res.status(409).json({
      message: "Ya se ha aceptado esta práctica profesional",
    });
  } else if (solicitudPracticaAnteriorNoTerminada) {
    return res.status(409).json({
      message: "Aun no se termina la práctica profesional anterior",
    });
  }

  try {
    const solicitud = await db.solicitud.create({
      rut,
      rutEmpresa: datos.rutEmpresa,
      fechaSolicitud: new Date(),
      numeroPractica: datos.numeroPractica,
      fase: 1,
    });

    return res.status(201).json({
      message: "Solicitud creada exitosamente",
      solicitud,
    });
  } catch (error) {
    console.error('Error al crear solicitud:', error);
    return res.status(500).json({
      message: "Error interno del servidor al crear la solicitud",
    });
  }
};

const faseSolicitud = async (req, res) => {
  const id = req.params.id;

  try {
    const { fase, rechazo } = req.body;

    const solicitud = await db.solicitud.findOne({ where: { idSolicitud: id } });

    if (!solicitud) {
      return res.status(404).json({
        message: "Solicitud no encontrada",
      });
    }

    if (solicitud.fase === 3) {

      if (solicitud.supervisorCheck === false || solicitud.alumnoCheck === false) {
        return res.status(409).json({
          message: "Solicitud no se encuentra lista para avanzar de fase",
        });
      }

    }

    solicitud.fase = fase;
    if (fase === 7) {
      solicitud.descripcionRechazo = rechazo;
    }

    await solicitud.save();

    return res.status(200).json({
      message: "Solicitud cambiada de fase exitosamente",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error interno del servidor",
      err,
    });
  }
};

const verSolicitudesUsuario = async (req, res) => {
  try {
    const { token } = req.body;
    const usuario = await jwt.verify(token, key);
    console.log(usuario);
    const solicitudes = await db.solicitud.findAll({ where: { rut: usuario.rut } });
    return res.status(200).json({
      message: "Solicitudes listadas exitosamente",
      solicitudes
    });
  }
  catch (err) {
    return res.status(500).json({
      message: "Error al listar las solicitudes",
      err
    })
  }

};

// Vista usuario
const verSolicitudesAceptadasU = async (req, res) => {
  try {
    const { rut } = req.body;
    const solicitudes = await db.solicitud.findAll({ where: { rut: rut, fase: "Aceptada" } });
    const solicitudList = solicitudes.map((solicitud) => {
      return {
        idSolicitud: solicitud.idSolicitud,
        numeroPractica: solicitud.numeroPractica,
        fase: solicitud.fase
      };
    });
    return res.status(200).json({
      message: "Solicitudes listadas exitosamente",
      solicitudList
    });
  }
  catch (err) {
    return res.status(500).json({
      message: "Error al listar las solicitudes",
      err
    })
  }
};

// Vista coordinador
const allSolicitudesCoo = async (req, res) => {
  try {
    const solicitudes = await db.solicitud.findAll({ where: { fase: "3" } });
    return res.status(200).json({
      message: "Solicitudes listadas exitosamente",
      solicitudes,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error al listar las solicitudes",
      err,
    });
  }
};

// Vista Jefe de Carrera
const allSolicitudesJefe = async (req, res) => {
  try {
    const solicitudes = await db.solicitud.findAll({ where: { fase: "2" } });
    return res.status(200).json({
      message: "Solicitudes listadas exitosamente",
      solicitudes,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error al listar las solicitudes",
      err,
    });
  }
};

// Vista Secretaria // No implementada
const allSolicitudesSec = async (req, res) => {
  try {
    const solicitudes = await db.solicitud.findAll({ where: { fase: "1" } });
    return res.status(200).json({
      message: "Solicitudes listadas exitosamente",
      solicitudes,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error al listar las solicitudes",
      err,
    });
  }
};

const readySupervisor = async (req, res) => {

  const { idSolicitud } = req.body;

  try {
    const solicitud = await db.solicitud.findOne({ where: { idSolicitud } });

    if (!solicitud) {
      return res.status(404).json({
        message: "Solicitud no encontrada",
      });
    }

    if (solicitud.supervisorCheck == true) {
      return res.status(409).json({
        message: "Solicitud ya fue marcada como lista por el supervisor",
      });
    }

    if (solicitud.fase == 2) {
      solicitud.supervisorCheck = true;
      await solicitud.save();

      return res.status(200).json({
        message: "Solicitud actualizada exitosamente. Supervisor listo.",
      });
    }
    else {
      return res.status(409).json({
        message: "Solicitud no se encuentra en la fase correcta",
      });
    }

  }
  catch (err) {
    return res.status(500).json({
      message: "Error interno del servidor",
      err,
    });
  }
};

const readyAlumno = async (req, res) => {

  const { idSolicitud } = req.body;

  try {

    const solicitud = await db.solicitud.findOne({ where: { idSolicitud } });

    if (!solicitud) {
      return res.status(404).json({
        message: "Solicitud no encontrada",
      });
    }

    if (solicitud.fase == 2) {
      solicitud.alumnoCheck = true;
      await solicitud.save();

      return res.status(200).json({
        message: "Solicitud actualizada exitosamente. Alumno listo.",
      });
    }
    else {
      return res.status(409).json({
        message: "Solicitud no se encuentra en la fase correcta",
      });
    }

  }
  catch (err) {
    return res.status(500).json({
      message: "Error interno del servidor",
      err,
    });
  }

};

// aplicar solo usarios con el token de admin pueden usar esta funcion.

const actulizarFase = async (req, res) => {

  const { idSolicitud, nroFase, motivoRechazo } = req.body;

  try {

    const solicitud = await db.solicitud.findOne({ where: { idSolicitud } });

    if (!solicitud) {
      return res.status(404).json({
        message: "Solicitud no encontrada",
      });
    }

    if (motivoRechazo){
      solicitud.descripcionRechazo = motivoRechazo
    }

    solicitud.fase = nroFase;
    await solicitud.save();

    return res.status(200).json({
      message: "Se realizo correctamente el cambio de fase.",
    });
  }

  catch (err) {
  return res.status(500).json({
    message: "Error interno del servidor",
    err,
  });
}
};


module.exports = {
  crearSolicitud,
  faseSolicitud,
  verSolicitudesUsuario,
  verSolicitudesAceptadasU,
  allSolicitudesCoo,
  allSolicitudesJefe,
  allSolicitudesSec,
  readyAlumno,
  readySupervisor,
  actulizarFase,
  supXest
};
