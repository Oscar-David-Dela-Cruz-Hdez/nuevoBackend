// backend/routes/UsuarioRoutes.js
const express = require("express");
const Usuario = require("../models/Usuario");
const router = express.Router();

// Leer todos los usuarios
router.get("/", async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

// Actualizar el rol de un usuario
router.put("/:id", async (req, res) => {
  try {
    const { rol } = req.body;
    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      { rol },
      { new: true }
    );

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json({ mensaje: "Rol de usuario actualizado", usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar rol de usuario" });
  }
});

module.exports = router;