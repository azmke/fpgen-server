const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /stylegan2ada/models:
 *   get:
 *     summary: List of GAN models
 *     description: Returns a list of available GAN models
 */
router.get("/stylegan2ada/models", (req, res) => {
    res.end();
});

router.get("/stylegan2ada/project", (req, res) => {
    const {network, image, seed} = req.body;

    res.end();
});

/**
 * @swagger
 * /stylegan2/generate:
 *   get:
 *     summary: Generate fingerprint with StyleGAN2-ADA
 *     description: Returns a random fingerprint image generated using StyleGAN2-ADA
 */
router.get("/stylegan2ada/generate", (req, res) => {
    const {network, seed, latent, truncation} = req.body;

    res.end();
});

router.get("/stylegan2ada/morph", (req, res) => {
    const {source_hash, target_hash, network, alpha} = req.body;

    res.end();
});

module.exports = router;