const config = require("config");

const express = require("express");
const router = express.Router();

const path = require("path");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.post("/pix2pix/generate", upload.single("minutiaemap"), (req, res) => {
	try {
		const seed = Math.floor(Math.random() * config.dummy.pix2pix.count);

		res.sendFile(
			path.join(
				config.dummy.pix2pix.path,
				`${config.dummy.filename_prefix}${seed}${config.dummy.filename_suffix}`
			)
		);
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
