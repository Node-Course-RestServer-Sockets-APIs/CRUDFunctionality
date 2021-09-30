const { userGet } = require("../controllers/user");
const Role = require("../models/role");
const User = require("../models/user");

const roleValidation = async (role) => {
	const existsRole = await Role.findOne({ role });
	if (!existsRole) {
		throw new Error(`${role} is a invalid role.`);
	}
};
const emailValidation = async (email) => {
	const existsEmail = await User.findOne({ email });
	if (existsEmail) {
		throw new Error("El email ya se encuentra registrado");
	}
};
const idValidation = async (_id) => {
	const existsId = await User.findById(_id);
	if (!existsId) {
		throw new Error(`Not users with id:${_id}`);
	}
};

module.exports = {
	roleValidation,
	emailValidation,
	idValidation,
};
