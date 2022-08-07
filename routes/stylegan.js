const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /stylegan/generate:
 *   get:
 *     summary: Generate fingerprint with StyleGAN
 *     description: Returns a random fingerprint image generated using StyleGAN
 */
router.get("/stylegan/generate", (req, res) => {
    const {seed, gpu} = req.body;

    res.end();
});

module.exports = router;