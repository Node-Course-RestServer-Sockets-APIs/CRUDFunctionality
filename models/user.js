const { response } = require("express");
const { Schema, model } = require("mongoose");

const UserSchema = Schema({
	name: {
		type: String,
		required: [true, "Ingrese su nombre"],
	},
	email: {
		type: String,
		required: [true, "Ingrese su email"],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "La constraseña es obligatoria"],
	},
	img: {
		type: String,
	},
	role: {
		type: String,
		required: true,
		emun: ["ADMIN_ROLE", "USER_ROLE"],
	},
	state: {
		type: Boolean,
		default: true,
	},
	googleSignUp: {
		type: Boolean,
		default: false,
	},
});

UserSchema.methods.toJSON = function () {
	const { password, __v, ...rest } = this.toObject();
	return rest;
};

module.exports = model("User", UserSchema);
