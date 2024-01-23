const db = require("../models");
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
const key = require('../config/const.js').JWT_SECRET;

const validarEmpresa = async (req,res,next) => {

    const { razonSocial } = req.body;

    const empresa = await db.empresa.findOne({where:{razonSocial:razonSocial}});

    try{

        if(empresa){
            return res.status(200).json({
                message:"La empresa ya existe.",
                empresa,
            });
        }
        else{
            return res.status(404).json({
                message:"La empresa no existe.",
            });
        }
    } catch(err){
        return res.status(500).json({
            message:"Error al buscar empresa.",
            err
        });
    }
    
}

const crearEmpresa = async (req,res) => {

    const { rutEmpresa, razonSocial, ciudad, region, direccion, rubro } = req.body;

    try{

        empresa = await db.empresa.findOne({where:{rutEmpresa:rutEmpresa}});
        console.log(empresa);

        if (empresa){
            return res.status(409).json({                           // 409: Revisar codigo HTTP. Sharp 🤨 
                message:"La empresa ya existe."
            });
        }
        else{

            const empresa = await db.empresa.create({
                rutEmpresa,
                razonSocial,
                ciudad,
                region,
                direccion,
                rubro
            });

            return res.status(200).json({
                message:"Empresa creada exitosamente.",
                empresa
            });
        }
    } catch(err){
        return res.status(500).json({
            message:"Error al crear empresa.",
            err
        });
    }
}

const listarEmpresas = async (req,res) => {

    try{

        const empresas = await db.empresa.findAll({
            attributes: ['razonSocial']
        });

        const razonSocialList = empresas.map(empresa => empresa.razonSocial);

        return res.status(200).json({
            message:"Empresas listadas exitosamente.",
            razonSocialList
        });
    } catch(err){
        return res.status(500).json({
            message:"Error al listar empresas.",
            err
        });
    }
};

const buscarEmpresas = async (req,res) => {

    const razonSocial = req.query.razonSocial;
    console.log(razonSocial);

    try{

        const empresas = await db.empresa.findAll({
            where: { razonSocial: {
                [Op.like]: `%${razonSocial}%`
            } }
        });

        if(empresas.length == 0){
            return res.status(404).json({
                message:"No se encontraron empresas."
            });
        }

        return res.status(200).json({
            message:"Empresas encontradas.",
            empresas
        });
    } catch(err){
        return res.status(500).json({
            message:"Error al buscar empresas.",
            err
        });
    }
};

module.exports = {
    validarEmpresa,
    crearEmpresa,
    listarEmpresas,
    buscarEmpresas
};
