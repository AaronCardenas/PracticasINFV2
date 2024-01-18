module.exports = (sequelize, Sequelize) =>{

    const carta = sequelize.define('carta de aceptacion', {

        idAceptacion: {
            type: Sequelize.INTEGER,
            primaryKey: true
          },
          idSolicitud: {
            type: Sequelize.INTEGER,
            allowNull: true
          },
          correoSupervisor: {
            type: Sequelize.STRING(45),
            allowNull: true
          },
          tareas: {
            type: Sequelize.STRING(45),
            allowNull: true
          },
          area: {
            type: Sequelize.STRING(45),
            allowNull: true
          },
          fechaInicio: {
            type: Sequelize.DATE,
            allowNull: true
          },
          fechaTermino: {
            type: Sequelize.DATE,
            allowNull: true
          }
    }, {
      // Opciones adicionales
      tableName: 'carta de aceptacion',
      freezeTableName: true,
    });

    return carta;
    
};
