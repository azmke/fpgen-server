const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Fingerprint Generator API",
			version: "1.0.0",
			description:
				"A REST API for assisted generation of synthetic fingerprints with the help of pre-trained GAN models",
			license: {
				name: "MIT Licence",
				url: "https://spdx.org/licenses/MIT.html",
			},
		},
		servers: [
			{
				url: "http://localhost:5000",
				description: "Development server",
			},
		],
	},
	apis: ["./routes/*.js", "./routes/andrey/*.js"],
};

module.exports = options;
