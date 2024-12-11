const { Brand } = require("../../models");

exports.showBrand = async (req, res) => {
    const brand = await Brand.findOne();
    res.render("admin/brands/index", { brand, layout: 'admin/layouts/layout' });
} 

exports.editBrand = async (req, res) => {
    const brand = await Brand.findOne();
    res.render("admin/brands/update", { brand, layout: 'admin/layouts/layout' }); 
};

exports.updateBrand = async (req, res) => {
    try {
        const { nombre, color } = req.body;
        const brand = await Brand.findOne();

        if (req.file) {
            brand.logoUrl = `/uploads/${req.file.filename}`;
        }

        brand.nombre = nombre;
        brand.colorCode = color;

        await brand.save();

        res.redirect("/admin/brands");
    } catch (error) {
        console.error('Error al actualizar el brand:', error);
        res.status(500).json({ message: 'Error al actualizar el brand', details: error.message });
    }
};

module.exports = exports;