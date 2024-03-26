const db = require("../models");
const Op = db.Sequelize.Op;


const empresasAprobadas = async (req, res) => {
    try {
        const solicitudes = await db.solicitud.findAll({
            where: {
                calificacion: {
                    [db.Sequelize.Op.gte]: 4
                }
            }
        });
        
        const empresasRepetidas = {};
        solicitudes.forEach(async solicitud => {
            console.log(solicitud.rutEmpresa);
            const empresaId = await db.empresa.findOne({where: {rutEmpresa: solicitud.rutEmpresa}});
            console.log(empresaId.razonSocial);
            if (empresasRepetidas[empresaId]) {
                empresasRepetidas[empresaId]++;
            } else {
                empresasRepetidas[empresaId] = 1;
            }
        });
        res.status(200).json(empresasRepetidas);
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    empresasAprobadas
};