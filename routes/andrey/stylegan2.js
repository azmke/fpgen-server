const config = require("config");

const express = require("express");
const router = express.Router();

const axios = require("axios").default;

const path = require("path");
const fs = require("fs");

/**
 * @swagger
 * /stylegan2/generate:
 *   get:
 *     summary: Generate fingerprint with StyleGAN2
 *     description: Returns a random fingerprint image generated using StyleGAN2
 */
router.post("/stylegan2/generate", async (req, res) => {
	try {
		const { seed, gpu, truncation } = req.body;

		// request to Andreys API
		const response = await axios.get(
			`${config.andreys_api.url}/api/stylegan2/generate`,
			{
				params: {
					seed,
					gpu,
					truncation,
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

		const filename = match[2];

		// wait for fingerprint image to be generated

		const filepath = path.join(
			config.andreys_api.stylegan2_dir,
			filename + ".png"
		);
		console.log(filepath);

		let counter = Math.floor(
			config.filecheck.timeout / config.filecheck.interval
		);

		const filecheck = setInterval(function () {
			try {
				fs.accessSync(filepath);
				// success!! file exists

				// clear interval
				clearInterval(filecheck);

				// return file
				res.sendFile(filepath);
			} catch (err) {
				counter--;
			}

			// could not access file
			if (counter == 0) {
				clearInterval(filecheck);

				res.status(500).json({
					message: "Fingerprint file not found",
					code: "FILE_NOT_FOUND",
					ok: false,
				});
			}
		}, config.filecheck.interval);
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
