const config = require("config");

const express = require("express");
const router = express.Router();

router.use(require("./routes/dummy"));

if (config.dummy.active) {
	router.use(require("./routes/dummy/pggan"));
	router.use(require("./routes/dummy/pix2pix"));
	router.use(require("./routes/dummy/stylegan"));
	router.use(require("./routes/dummy/stylegan2"));
	router.use(require("./routes/dummy/nfiq2"));
} else {
	router.use(require("./routes/andrey/pggan"));
	router.use(require("./routes/andrey/pix2pix"));
	router.use(require("./routes/andrey/stylegan"));
	router.use(require("./routes/andrey/stylegan2"));
	//router.use(require("./routes/andrey/nfiq2"));
}

module.exports = router;
