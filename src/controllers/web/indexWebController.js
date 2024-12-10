const { Banner, Encuesta, sequelize } = require("../../models");

exports.index = async (req, res) => {
    const banner = await Banner.findOne({ order: sequelize.random() });
    const encuestas = await Encuesta.findAll({ attributes: ["id", "titulo"] });
    res.render("web/index", { banner, encuestas, layout: false }); 
};

exports.getEncuesta = async (req, res) => {
    const { id } = req.params;
    const banner = await Banner.findOne({ order: sequelize.random() });
    const encuestas = await Encuesta.findAll({ attributes: ["id", "titulo"] });
    const encuesta = await Encuesta.findByPk(id);
    res.render("web/encuesta", { banner, encuestas, encuesta, layout: "web/layouts/layout" }); 
};

module.exports = exports;