const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /pggan/generate:
 *   get:
 *     summary: Generate fingerprint with Progressive Growing GAN
 *     description: Returns a random fingerprint image generated using a Progressive Growing GAN
 */
router.get("/pggan/generate", (req, res) => {
	const { seed, gpu } = req.body;

	res.end();
});

module.exports = router;
