const express = require("express");
const app = express();

const helmet = require("helmet");
app.use(helmet());

const compression = require("compression");
app.use(compression());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const morgan = require("morgan");
app.use(morgan("tiny"));

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`HTTP server running on port ${port}`);
});

const router = require("./router");
app.use("/", router);

app.get("/", (req, res) => {
	res.status(200).send("OK");
});

module.exports = app;
