const { Banner } = require("../../models");

exports.createBanner = async (req, res) => {
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

        res.status(201).json(banner);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear el banner", details: error.message });
    }
};