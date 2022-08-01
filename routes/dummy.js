const express = require("express");
const router = express.Router();

const path = require("path");

/**
 * @swagger
 * /dummy:
 *   get:
 *     summary: Dummy fingerprint
 *     description: Always return the same picture of a fingerprint for testing purposes
 */
router.get("/dummy", (req, res) => {
	res.sendFile(path.join(__dirname, "../fingerprint.jpg"));
});

module.exports = router;
