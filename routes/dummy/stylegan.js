const config = require("config");

const express = require("express");
const router = express.Router();

const path = require("path");

router.post("/stylegan/generate", async (req, res) => {
	try {
		const { seed } = req.body;

		const validatedSeed = Number(seed) % config.dummy.stylegan.count;

		res.sendFile(
			path.join(
				config.dummy.stylegan.path,
				`${config.dummy.filename_prefix}${validatedSeed}${config.dummy.filename_suffix}`
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
