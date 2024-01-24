const db = require("../models");

const Op = db.Sequelize.Op;

const crearSolicitud = async (req, res) => {
    const { rut, rutempresa, extension, numeroPractica } = req.body;
  
    const solicitudCalificada = await db.solicitud.findOne({
      where: { rut, fase: "Calificada", numeroPractica },
    });
  
    const solicitudAceptada = await db.solicitud.findOne({
      where: { rut, fase: "Aceptada", numeroPractica },
    });
  
    const solicitudPracticaAnteriorNoTerminada = await db.solicitud.findOne({
      where: { rut, fase: { [Op.not]: "Calificada" }, numeroPractica: numeroPractica - 1 },
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
        rutEmpresa: rutempresa,
        fechaSolicitud: new Date(),
        extension,
        numeroPractica,
        fase: 'Solicitada',
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

    solicitud.fase = fase;
    if (fase === "Rechazada") {
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

// Vista usuario
const verSolicitudesUsuario = async (req, res)=>{
    try {        
        const {rut}= req.body;
        const solicitudes= await db.solicitud.findAll({where:{rut:rut}});
        const solicitudList =  solicitudes.map((solicitud)=>{return {
            idSolicitud:solicitud.idSolicitud,
            numeroPractica:solicitud.numeroPractica,
            fase:solicitud.fase};
        }); 
        return res.status(200).json({
            message:"Solicitudes listadas exitosamente",
            solicitudList
        });
    }
    catch (err) {
        return res.status(500).json({
            message:"Error al listar las solicitudes",
            err
        })
    }

};
// Vista usuario
const verSolicitudesAceptadasU = async(req,res)=>{
    try {        
        const {rut}= req.body;
        const solicitudes= await db.solicitud.findAll({where:{rut:rut,fase:"Aceptada"}});
        const solicitudList =  solicitudes.map((solicitud)=>{return {
            idSolicitud:solicitud.idSolicitud,
            numeroPractica:solicitud.numeroPractica,
            fase:solicitud.fase};
        }); 
        return res.status(200).json({
            message:"Solicitudes listadas exitosamente",
            solicitudList
        });
    }
    catch (err) {
        return res.status(500).json({
            message:"Error al listar las solicitudes",
            err
        })
    }
};

// Vista coordinador
const allSolicitudesCoo = async (req, res) => {
  try {
    const solicitudes = await db.solicitud.findAll({where:{fase:"2"}});
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
    const solicitudes = await db.solicitud.findAll({where:{fase:"1"}});
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
    const solicitudes = await db.solicitud.findAll({where:{fase:"3"}});
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

module.exports = {
    crearSolicitud,
    faseSolicitud,
    verSolicitudesUsuario,
    verSolicitudesAceptadasU,
    allSolicitudesCoo,
    allSolicitudesJefe,
    allSolicitudesSec
};
