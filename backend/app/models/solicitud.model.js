module.exports = (sequelize, Sequelize) => {
    const solicitud = sequelize.define('solicitud de practica', {
        idSolicitud: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,  // Agrega esta línea para hacerlo autoincrementable
            unique: true,        // Agrega esta línea para hacerlo único
          },
          rut: {
            type: Sequelize.STRING(15),
            allowNull: true
          },
          rutEmpresa: {
            type: Sequelize.STRING(15),
            allowNull: true
          },
          fechaSolicitud: {
            type: Sequelize.DATE,
            allowNull: true
          },
          extension: {
            type: Sequelize.INTEGER,
            allowNull: true
          },
          numeroPractica: {
            type: Sequelize.INTEGER,
            allowNull: true
          },
          descripcionRechazo: {
            type: Sequelize.STRING(100),
            allowNull: true
          },
          fase: {
            type: Sequelize.INTEGER,
            allowNull: true
          },
          calificacion: {
            type: Sequelize.INTEGER,
            allowNull: true
          }        
    }, {
      // Opciones adicionales
      tableName: 'solicitud',
      freezeTableName: true,
    });
    return solicitud
};
