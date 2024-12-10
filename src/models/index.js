const sequelize = require("../config/database");

const User = require("./user");
const Banner = require("./banner");
const Encuesta = require("./encuesta");

User.hasMany(Banner, { foreignKey: "userId" });
User.hasMany(Encuesta, { foreignKey: "userId" });
Banner.belongsTo(User, { foreignKey: "userId" });
Encuesta.belongsTo(User, { foreignKey: "userId" });

sequelize.sync({ force: false })
    .then(() => console.log("Tablas sincronizadas"))
    .catch(err => console.error("Error al sincronizar las tablas", err));

module.exports = { sequelize, User, Banner, Encuesta};