const express = require("express");
const router = express.Router();

router.use(require("./routes/dummy"));

router.use(require("./routes/verifinger"));
router.use(require("./routes/stylegan2ada"));
router.use(require("./routes/pggan"));
router.use(require("./routes/stylegan"));
router.use(require("./routes/stylegan2"));
router.use(require("./routes/pix2pix"));

module.exports = router;
