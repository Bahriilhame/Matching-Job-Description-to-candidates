const express = require("express");
const router = express.Router();
const ContactMessage = require("../db/ContactMessage");

// POST /api/contact
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  try {
    const newMessage = new ContactMessage({ name, email, message });
    await newMessage.save();
    res.status(201).json({ message: "Message reçu avec succès." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur, réessayez plus tard." });
  }
});

module.exports = router;
