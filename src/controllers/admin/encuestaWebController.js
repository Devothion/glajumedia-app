const { Encuesta, User } = require("../../models");

exports.getAllEncuestas = async (req, res) => {
    const encuestas = await Encuesta.findAll({ include: User });
    res.render("admin/encuestas/index", { encuestas, layout: 'admin/layouts/layout' });
};

exports.createEncuesta = async (req, res) => {
    const users = await User.findAll();
    res.render("admin/encuestas/create", { users, layout: 'admin/layouts/layout' });
};

exports.storeEncuesta = async (req, res) => {
    const { titulo, descripcion, codigo, userId } = req.body;
    await Encuesta.create({ titulo, descripcion, codigo, userId });
    res.redirect("/admin/encuestas");
};

exports.editEncuesta = async (req, res) => {
    const { id } = req.params;
    const encuesta = await Encuesta.findByPk(id);
    const users = await User.findAll();
    res.render("admin/encuestas/update", { encuesta, users, layout: 'admin/layouts/layout' });
};

exports.updateEncuesta = async (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, codigo, userId } = req.body;
    const encuesta = await Encuesta.findByPk(id);
    if (!encuesta) {
        return res.status(404).json({ error: "Encuesta no encontrada" });
    }
    encuesta.titulo = titulo;
    encuesta.descripcion = descripcion;
    encuesta.codigo = codigo;
    encuesta.userId = userId;
    await encuesta.save();
    res.redirect("/admin/encuestas");
};

exports.deleteEncuesta = async (req, res) => {
    const { id } = req.params;
    await Encuesta.destroy({ where: { id } });
    res.redirect("/admin/encuestas");
};

module.exports = exports;