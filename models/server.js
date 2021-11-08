const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { dbConnection } = require("../database/config.js");

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;

		this.userPath = "/api/user";
		this.authPath = "/api/auth";
		this.productPath = "/api/product";
		this.categoryPath = "/api/category";
		this.searchPath = "/api/search";
		this.uploadPath = "/api/upload";

		//Connection to DB
		this.database();
		//Middleware
		this.middleware();
		//Routes
		this.routes();
	}
	async database() {
		await dbConnection();
	}

	middleware() {
		//Cors - Validacion de la url de origen
		this.app.use(cors());

		//Express - servir la pagina
		this.app.use(express.static("public"));

		//JSON - Lectura y parseo
		this.app.use(express.json());

		//FileUpload managment
		this.app.use(
			fileUpload({
				useTempFiles: true,
				tempFileDir: "/tmp/",
				createParentPath: true,
			})
		);
	}

	routes() {
		this.app.use(this.userPath, require("../routes/user.js"));
		this.app.use(this.authPath, require("../routes/auth.js"));
		this.app.use(this.categoryPath, require("../routes/category.js"));
		this.app.use(this.productPath, require("../routes/product.js"));
		this.app.use(this.searchPath, require("../routes/search.js"));
		this.app.use(this.uploadPath, require("../routes/upload.js"));
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log("Escuchando en el puerto", this.port);
		});
	}
}

module.exports = Server;
