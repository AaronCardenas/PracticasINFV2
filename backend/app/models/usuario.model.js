module.exports = (sequelize, Sequelize) => {
  const usuario =sequelize.define('usuario',{
    rut: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      password: {
        type: Sequelize.STRING(45),
        allowNull: true
      },
      tipoUsuario: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      nombreCompleto: {
        type: Sequelize.STRING(45),
        allowNull: true
      },
      telefono: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      correo: {
        type: Sequelize.STRING(45),
        allowNull: true
      },
      direccion: {
        type: Sequelize.STRING(45),
        allowNull: true
      },
      planEstudio: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      ingreso: {
        type: Sequelize.INTEGER,
        allowNull: true
      }
  }, {
    // Opciones adicionales
    tableName: 'usuario',
    freezeTableName: true,
  });
  return usuario
};
