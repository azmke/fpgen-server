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
 * /nfiq2/single:
 *   post:
 *     summary: Rate fingerprint quality
 *     description: Returns a score between 0 and 1 how realistic an uploaded fingerprint is
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 score:
 *                   type: float
 *                   example: 0.87
 *                   
 *       '500':
 *         description: Internal error
 */
router.post(
	"/pix2pix/generate",
	upload.single("image"),
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
			formData.append("image", stream);

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
