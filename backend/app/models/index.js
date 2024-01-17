const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.carta = require("./carta.model.js")(sequelize,Sequelize);
db.empresa = require("./empresa.model.js")(sequelize,Sequelize);
db.informe = require("./informe.model.js")(sequelize,Sequelize);
db.memoria = require("./memoria.model.js")(sequelize,Sequelize);
db.solicitud = require("./solicitud.model.js")(sequelize,Sequelize);
db.supervisor = require("./supervisor.model.js")(sequelize,Sequelize);
db.usuario = require("./usuario.model.js")(sequelize,Sequelize);

db.usuario.hasMany(db.solicitud,{foreignKey:'rut'});
db.solicitud.belongsTo(db.usuario,{foreignKey:'rut'});


db.empresa.hasMany(db.solicitud,{foreignKey:'rutEmpresa'});
db.solicitud.belongsTo(db.empresa,{foreignKey:'rutEmpresa'});


db.empresa.hasMany(db.supervisor,{foreignKey:'rutEmpresa'});
db.supervisor.belongsTo(db.empresa,{foreignKey:'rutEmpresa'});


db.solicitud.hasMany(db.memoria,{foreignKey:'idSolicitud'});
db.memoria.belongsTo(db.solicitud,{foreignKey:'idSolicitud'});


db.solicitud.hasMany(db.carta,{foreignKey:'idSolicitud'});
db.carta.belongsTo(db.solicitud,{foreignKey:'idSolicitud'});


db.supervisor.hasMany(db.carta,{foreignKey:'correoSupervisor'});
db.carta.belongsTo(db.supervisor,{foreignKey:'correoSupervisor'});


db.solicitud.hasMany(db.informe,{foreignKey:'idSolicitud'});
db.informe.belongsTo(db.solicitud,{foreignKey:'idSolicitud'});

module.exports = db;