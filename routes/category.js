const { Router } = require("express");
const { check } = require("express-validator");
const {
	categoriesGetOne,
	categoriesGetAll,
	categoriesPost,
	categoriesPut,
	categoriesDelete,
} = require("../controllers/categories");
const { categoryExists } = require("../helpers/db_validation");
const { jwt_validation, hasRole, validarCampos } = require("../middlewares");
const {
	categoryNameExists,
	nameToUpperCase,
} = require("../middlewares/categoriesValidation");

const router = new Router();

// {{url}}/api/categories

//Get all the categories - Public
router.get("/", [validarCampos], categoriesGetAll);

//Get one category - Public
router.get(
	"/:id",
	[
		check("id", "Invlid ID").isMongoId(),
		check("id").custom(categoryExists),
		validarCampos,
	],
	categoriesGetOne
);

//Create a new Category - Private - Token Valido
router.post(
	"/",
	[jwt_validation, check("name").not().isEmpty(), validarCampos],
	categoriesPost
);

//Update one Category - Private - Token Valido
router.put(
	"/:id",
	nameToUpperCase,

	check("id", "Invlid ID").isMongoId(),
	jwt_validation,
	hasRole("ADMIN_ROLE", "SALE_ROLE"),
	check("name").not().isEmpty(),
	check("name").custom(categoryNameExists),
	check("id").custom(categoryExists),
	validarCampos,

	categoriesPut
);

//Delete Category - Admin -
router.delete(
	"/:id",
	[
		check("id", "Invlid ID").isMongoId(),
		jwt_validation,
		check("id").custom(categoryExists),
		hasRole("ADMIN_ROLE"),
		validarCampos,
	],
	categoriesDelete
);

module.exports = router;
