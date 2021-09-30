const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const { generarJWT } = require("../helpers/tokens");
const User = require("../models/user");

const authGet = async (req = request, res = response) => {
	const { password, email } = req.body;
	try {
		//Verificar email
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ msg: "Unregistered email." });
		}
		//Verificar activo
		if (!user.state) {
			return res.status(400).json({ msg: "Inactive Account." });
		}
		//Coincide contraseña

		const token = await generarJWT(user.id);
		return res.status(200).json({ user, token });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: "Invalid password/email." });
	}
};

const authPut = (req, res) => {};
const authPost = (req, res) => {};
const authDelete = (req, res) => {};

module.exports = { authGet, authPut, authPost, authDelete };
