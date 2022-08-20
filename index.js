const config = require("config");
const cors = require("cors");

const express = require("express");
const app = express();
app.use(cors());

const helmet = require("helmet");
app.use(helmet());

const compression = require("compression");
app.use(compression());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const morgan = require("morgan");
app.use(morgan("tiny"));

const router = require("./router");
app.use("/", router);


app.get("/", (req, res) => {
	res.status(200).send("OK");
});

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = require("./swagger");
const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`HTTP server running on port ${port}`);
});

module.exports = app;
