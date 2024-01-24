module.exports = (sequelize, Sequelize) => {
    const solicitud = sequelize.define('solicitud de practica', {
        idSolicitud: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
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
            type: Sequelize.INTEGER,
            /*
            1: Solicitada
            2: Firmada // Carta de presentacion
            3: Aceptada // Carta de aceptacion
            4: Terminada // Lo demas
            5: Calificada // ...
            7: Rechazada (""""""hipotetico"""""")
            */
            allowNull: true
          },
          supervisorCheck:{             // A usar para el cambio de fase.
            type: Sequelize.BOOLEAN,
            allowNull: true
          },
          alumnoCheck:{                 // A usar para el cambio de fase.
            type: Sequelize.BOOLEAN,
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
