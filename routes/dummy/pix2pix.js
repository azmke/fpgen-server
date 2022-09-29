const config = require("config");

const express = require("express");
const router = express.Router();

const path = require("path");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.post("/pix2pix/generate", upload.single("minutiaemap"), (req, res) => {
	res.sendFile(path.join(__dirname, "../../fingerprint.jpg"));
});

module.exports = router;
