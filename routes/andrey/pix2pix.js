const config = require("config");

const express = require("express");
const router = express.Router();

const axios = require("axios").default;

const path = require("path");
const fs = require("fs");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const FormData = require("form-data");
const { Readable } = require("stream");

/**
 * @swagger
 * /pix2pix/generate:
 *   get:
 *     summary: Generate fingerprint with pix2pix
 *     description: Returns a random fingerprint image generated using pix2pix
 */
router.post(
	"/pix2pix/generate",
	upload.single("minutiaemap"),
	async (req, res) => {
		try {
			const image = req.file;
			const stream = Readable.from(image.buffer);
			const { representation, gpu } = req.body;

			const formData = new FormData();
			formData.append("minutiaemap", stream);
			formData.append("representation", representation);
			formData.append("gpu", gpu);

			// request to Andreys API
			const response = await axios.get(
				`${config.andreys_api.url}/api/pix2pix/generate`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
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
				config.andreys_api.pix2pix_dir,
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
	}
);

module.exports = router;
