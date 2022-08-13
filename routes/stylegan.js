const config = require("config");

const express = require("express");
const router = express.Router();

const axios = require("axios").default;

/**
 * @swagger
 * /stylegan/generate:
 *   get:
 *     summary: Generate fingerprint with StyleGAN
 *     description: Returns a random fingerprint image generated using StyleGAN
 */
router.get("/stylegan/generate", async (req, res) => {
	try {
		const { seed, gpu } = req.params;

		// request to Andreys API
		const response = await axios.get(
			`${config.ANDREYS_API}/api/stylegan/generate`,
			{
				params: {
					seed,
					gpu,
				},
			}
		);

		// get file name of generated fingerprint image
		const { message } = response.data;
		if (!message) {
			return res.status(500).json({
				message: "No message",
				code: "NO_MESSAGE",
				ok: false,
			});
		}

		const regex = new RegExp(
			"Success: Synthetic fingerprint is stored in (.*)/(.*).png"
		);
		const match = message.match(regex);
		if (!match) {
			return res.status(500).json({
				message: "No file path in message",
				code: "NO_FILEPATH",
				ok: false,
			});
		}

		const path = match[1];
		const filename = match[2];

		// wait for fingerprint image to be generated

		console.log(response);

		res.end();
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: "Unknown error",
			code: "UNKNOWN_ERROR",
			ok: false,
		});
	}
});

module.exports = router;
