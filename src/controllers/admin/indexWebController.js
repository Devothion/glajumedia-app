const { User, Banner, Encuesta, Brand } = require("../../models");

exports.index = async (req, res) => {
    const users = await User.count();
    const banners = await Banner.count();
    const encuestas = await Encuesta.count();
    const brand = await Brand.count();
    res.render("admin/index", { users, banners, encuestas, brand, layout: "admin/layouts/layout" });
};

module.exports = exports;