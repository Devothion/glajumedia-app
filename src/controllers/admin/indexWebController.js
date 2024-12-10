const { User, Banner, Encuesta } = require("../../models");

exports.index = async (req, res) => {
    const users = await User.count();
    const banners = await Banner.count();
    const encuestas = await Encuesta.count();
    res.render("admin/index", { users, banners, encuestas, layout: "admin/layouts/layout" });
};

module.exports = exports;