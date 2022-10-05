const express = require("express");
const router = express.Router();

const path = require("path");

/**
 * @swagger
 * /dummy:
 *   get:
 *     summary: Dummy fingerprint
 *     description: Always return the same picture of a fingerprint for testing purposes
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 */
router.get("/dummy", (req, res) => {
	res.sendFile(path.join(__dirname, "../fingerprint.jpg"));
});

module.exports = router;
