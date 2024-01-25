module.exports = (sequelize, Sequelize) =>{
  const informe= sequelize.define('informe evaluacion', {
    idInforme: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    idSolicitud: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    documento: {
      type: Sequelize.BLOB,
      allowNull: true
    },
    fechaEnvio: {
      type: Sequelize.DATE,
      allowNull: true
    },
    nota: {
      type: Sequelize.INTEGER,
      allowNull: true
    }
  }, {
    // Opciones adicionales
    tableName: 'informe evaluacion',
    freezeTableName: true,
  });
  return informe;
};
