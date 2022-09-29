const config = require("config");

const express = require("express");
const router = express.Router();

const path = require("path");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const Jimp = require("jimp");

router.post("/nfiq2/single", upload.single("image"), async (req, res) => {
	try {
		const file = req.file;
		if (!file) {
			return res.status(400).json({
				message: "Empty file",
				code: "EMPTY_FILE",
				ok: false,
			});
		}

		const image = await Jimp.read(Buffer.from(file.buffer, "base64"));

		image.grayscale();

		const width = image.getWidth();
		const height = image.getHeight();

		// calculate average color
		let sum = 0;

		for (let x = 0; x < width; x++) {
			for (let y = 0; y < height; y++) {
				const color = Jimp.intToRGBA(image.getPixelColor(x, y));
				// r = g = b because of grayscale
				sum += color.r;
			}
		}

		const color = sum / (width * height);
		console.log(color);

		// calculate score
		const perfect = config.nfiq2.perfect;
		const score =
			color > perfect
				? ((255 - color) / (255 - perfect)) * 100
				: (color / perfect) * 100;

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
});

module.exports = router;
