module.exports = (sequelize, Sequelize) => {
    const solicitud = sequelize.define('solicitud de practica', {
        idSolicitud: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
          rut: {
            type: Sequelize.STRING(12),
            allowNull: true
          },
          rutEmpresa: {
            type: Sequelize.STRING(12),
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
            type: Sequelize.STRING(170),
            allowNull: true
          },
          fase: {
            type: Sequelize.ENUM('Solicitada','Aceptada','Rechazada','Terminada', 'Calificada'),
            allowNull: true
          },
          calificacion: {
            type: Sequelize.FLOAT,
            allowNull: true
          }        
    }, {
      // Opciones adicionales
      tableName: 'solicitud',
      freezeTableName: true,
    });
    return solicitud
};
