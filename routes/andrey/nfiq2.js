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
            if (!image) {
                return res.status(400).json({
                    message: "Empty file",
                    code: "EMPTY_FILE",
                    ok: false,
                });
            }

			const stream = Readable.from(image.buffer);
			const { representation, gpu } = req.body;

			const formData = new FormData();
			formData.append("iamge", stream);

			// request to Andreys API
			const response = await axios.get(
				`${config.andreys_api.url}/api/nfiq2/single`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			// get file name of generated fingerprint image
			const { score } = response.data;
			if (!score) {
				return res.status(500).json({
					message: "No score",
					code: "NO_SCORE",
					ok: false,
				});
			}

            // return score
            return res.status(200).json({
                message: "Success",
                score: score,
                ok: true,
            });
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
