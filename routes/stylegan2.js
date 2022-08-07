const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /stylegan2/generate:
 *   get:
 *     summary: Generate fingerprint with StyleGAN2
 *     description: Returns a random fingerprint image generated using StyleGAN2
 */
router.get("/stylegan2/generate", (req, res) => {
    const {seed, gpu, truncation} = req.body;

    res.end();
});

module.exports = router;