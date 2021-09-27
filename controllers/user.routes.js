const { response, request } = require("express");

const userGet = (req, res = response) => {
	res.status(403).json({
		msg: "get API - ",
	});
};

const userPut = (req, res) => {
	res.status(403).json({
		msg: "put API",
	});
};

const userPost = (req = request, res) => {
	const { nombre } = req.body;
	res.status(403).json({
		msg: `post API `,
		nombre,
	});
};

const userDelete = (req, res) => {
	res.status(403).json({
		msg: "delete API",
	});
};

module.exports = {
	userGet,
	userPut,
	userPost,
	userDelete,
};
