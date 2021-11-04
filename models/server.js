const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config.js");

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;

		this.userPath = "/api/user";
		this.authPath = "/api/auth";
		this.productPath = "/api/product";
		this.categoryPath = "/api/category";

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
	}

	routes() {
		this.app.use(this.userPath, require("../routes/user.js"));
		this.app.use(this.authPath, require("../routes/auth.js"));
		this.app.use(this.categoryPath, require("../routes/category.js"));
		this.app.use(this.productPath, require("../routes/product.js"));
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log("Escuchando en el puerto", this.port);
		});
	}
}

module.exports = Server;
