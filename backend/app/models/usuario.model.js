module.exports = (sequelize, Sequelize) => {
  const usuario =sequelize.define('usuario',{
    rut: {
        type: Sequelize.STRING(15),
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
      nombre1: {
        type: Sequelize.STRING(45),
        allowNull: true
      },
      nombre2: {
        type: Sequelize.STRING(45),
        allowNull: true
      },
      apellido1: {
        type: Sequelize.STRING(45),
        allowNull: true
      },
      apellido2: {
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
