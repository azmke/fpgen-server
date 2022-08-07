const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /pix2pix/generate:
 *   get:
 *     summary: Generate fingerprint with pix2pix
 *     description: Returns a random fingerprint image generated using pix2pix
 */
router.get("/pix2pix/generate", (req, res) => {
    const {minutiaemap, representation, gpu} = req.body;

    res.end();
});

module.exports = router;