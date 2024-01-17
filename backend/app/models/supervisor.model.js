module.exports = (sequelize, Sequelize)=> {
  const supervisor= sequelize.define('supervisor', {
    correoSupervisor: {
      type: Sequelize.STRING(45),
      primaryKey: true
    },
    rutEmpresa: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    nombre: {
      type: Sequelize.STRING(45),
      allowNull: true
    },
    password: {
      type: Sequelize.STRING(45),
      allowNull: true
    },
    telefono: {
      type: Sequelize.STRING(45),
      allowNull: true
    },
    cargoAdministrativo: {
      type: Sequelize.STRING(45),
      allowNull: true
    },
    titulocargo: {
      type: Sequelize.STRING(45),
      allowNull: true
    }
  }, {
    // Opciones adicionales
    tableName: 'supervisor',
    freezeTableName: true,
  });
  return supervisor;
};