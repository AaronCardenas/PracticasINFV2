const db = require("../models");
const Op = db.Sequelize.Op;

const crearInforme = async (req,res) => {
    
        const {idSolicitud, documento, fechaEnvio , nota} = req.body;
    
        try{
            
            const informe = await db.informe.create({
                idSolicitud,
                documento,
                fechaEnvio,
                nota
            });
    
            return res.status(200).json({
                message:"Memoria creada exitosamente.",
                informe
            });
        } catch(err){
            return res.status(500).json({
                message:"Error al crear memoria.",
                err
            });
        }
}
module.exports = {
    crearInforme
}