const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /hello:
 *   get:
 *     summary: Hello World
 *     description: Returns a friendly hello world to you.
 */
router.get("/hello", (req, res) => {
	res.send("Hello world! 😀");
});

module.exports = router;
