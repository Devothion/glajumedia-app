const { Encuesta } = require("../../models");

exports.getAllEncuestas = async (req, res) => {
    try {
        const encuestas = await Encuesta.findAll();
        res.json(encuestas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener las encuestas" });
    }
};

exports.createEncuesta = async (req, res) => {
    try {
        const { titulo, descripcion, codigo, userId } = req.body;
        const encuesta = await Encuesta.create({ titulo, descripcion, userId });
        res.json(encuesta);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear la encuesta" });
    }
};

exports.updateEncuesta = async (req, res) => {
    try {
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
        res.json(encuesta);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar la encuesta" });
    }
};

exports.deleteEncuesta = async (req, res) => {
    try {
        const { id } = req.params;
        const encuesta = await Encuesta.findByPk(id);
        if (!encuesta) {
            return res.status(404).json({ error: "Encuesta no encontrada" });
        }
        await encuesta.destroy();
        res.json({ message: "Encuesta eliminada correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar la encuesta" });
    }
};