const fs = require("fs");
const path = require("path");
const { Banner, User } = require("../../models");

exports.getAllBanners = async (req, res) => {
    const banners = await Banner.findAll({ include: User });
    res.render("admin/banners/index", { banners, layout: 'admin/layouts/layout' });
};

exports.createBanner = async (req, res) => {
    const users = await User.findAll();
    res.render("admin/banners/create", { users, layout: 'admin/layouts/layout' });
};

exports.storeBanner = async (req, res) => {
    try {
        const { titulo, descripcion, userId } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: "Debe subir una imagen" });
        }

        const banner = await Banner.create({
            titulo,
            descripcion,
            userId,
            imageUrl: `/uploads/${req.file.filename}`,
        });
        res.redirect("/admin/banners");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear el banner", details: error.message });
    }
};

exports.editBanner = async (req, res) => {
    const { id } = req.params;
    const banner = await Banner.findByPk(id);
    const users = await User.findAll();
    res.render("admin/banners/update", { banner, users, layout: 'admin/layouts/layout' });
};

exports.updateBanner = async (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, userId } = req.body;
    const banner = await Banner.findByPk(id);
    if (!banner) {
        return res.status(404).json({ error: "Banner no encontrado" });
    }
    banner.titulo = titulo;
    banner.descripcion = descripcion;
    banner.userId = userId;
    banner.imageUrl = `/uploads/${req.file.filename}`;
    await banner.save();
    res.redirect("/admin/banners");
};

exports.deleteBanner = async (req, res) => {
    const { id } = req.params;

    try {
        const banner = await Banner.findOne({ where: { id } });
        if (!banner) {
            return res.status(404).json({ error: "Banner no encontrado" });
        }

        const imagePath = path.join(__dirname, "../../public", banner.imageUrl);

        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        await Banner.destroy({ where: { id } });
        res.redirect("/admin/banners");
    
    } catch (error) {
        console.error("Error al eliminar el banner", error);
        res.status(500).json({ error: "Error al eliminar el banner", details: error.message });
    }
};

module.exports = exports;