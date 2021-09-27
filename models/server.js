const express = require("express");
const cors = require("cors");

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;

		this.usuarioPath = "/api/user.routes.js";
		//Middleware
		this.middleware();
		//Routes
		this.routes();
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
		this.app.use("/api/user", require("../routes/user.routes.js"));
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log("Escuchando en el puerto", this.port);
		});
	}
}

module.exports = Server;