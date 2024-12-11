const { Banner, Encuesta, Brand, sequelize } = require("../../models");

exports.index = async (req, res) => {
    const banner = await Banner.findOne({ order: sequelize.random() });
    const encuestas = await Encuesta.findAll({ attributes: ["id", "titulo"] });
    const brand = await Brand.findOne();
    res.render("web/index", { banner, encuestas, brand, locale: req.getLocale(), layout: false }); 
};

exports.getEncuesta = async (req, res) => {
    const { id } = req.params;
    const banner = await Banner.findOne({ order: sequelize.random() });
    const encuestas = await Encuesta.findAll({ attributes: ["id", "titulo"] });
    const encuesta = await Encuesta.findByPk(id);
    const brand = await Brand.findOne();
    res.render("web/encuesta", { banner, encuestas, encuesta, brand, layout: "web/layouts/layout" }); 
};

module.exports = exports;