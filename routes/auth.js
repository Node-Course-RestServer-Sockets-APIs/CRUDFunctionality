const { Router } = require("express");
const { check } = require("express-validator");
const {
	authGet,
	authPut,
	authPost,
	authDelete,
} = require("../controllers/auth");

const { validarCampos } = require("../middlewares/field_validation");

const router = new Router();

router.get(
	"/login",
	[
		check("email", "No es un formato valido").isEmail(),
		check("password", "Password is required").not().isEmpty(),
		check("password", "Password length must be more than 6.").isLength({
			min: 6,
		}),
		validarCampos,
	],
	authGet
);

module.exports = router;
