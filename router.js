const express = require("express");
const router = express.Router();

router.use(require("./routes/hello"));
router.use(require("./routes/dummy"));

module.exports = router;
