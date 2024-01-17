module.exports = (sequelize, Sequelize) =>{

  const empresa = sequelize.define('empresa', {

    rutEmpresa: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    razonSocial: {
      type: Sequelize.STRING(45),
      allowNull: true
    },
    ciudad: {
      type: Sequelize.STRING(45),
      allowNull: true
    },
    region: {
      type: Sequelize.STRING(45),
      allowNull: true
    },
    direccion: {
      type: Sequelize.STRING(45),
      allowNull: true
    },
    rubro: {
      type: Sequelize.STRING(45),
      allowNull: true
    }
  }, {
    // Opciones adicionales
    tableName: 'empresa',
    freezeTableName: true,
  });

  return empresa;
  
};
