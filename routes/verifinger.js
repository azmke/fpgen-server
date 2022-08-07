const express = require("express");
const router = express.Router();

router.get("/verifinger/verify", (req, res) => {
    const {image1, image2} = req.body;

    res.end();
});

router.get("/verifinger/minutiae", (req, res) => {
    const {image} = req.body;

    res.end();
});

module.exports = router;