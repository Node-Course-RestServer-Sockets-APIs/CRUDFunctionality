const { Router } = require("express");
const { check } = require("express-validator");
const {
	categoriesGetOne,
	categoriesPost,
	categoriesPut,
	categoriesDelete,
} = require("../controllers/categories");
const { productGetAll } = require("../controllers/product");
const { categoryExists } = require("../helpers/db_validation");
const { validarCampos, jwt_validation, hasRole } = require("../middlewares");
const {
	categoryNameExists,
	nameToUpperCase,
} = require("../middlewares/categoriesValidation");

const router = new Router();

// {{url}}/api/products

//Get all the Products - Public
router.get("/", [validarCampos], productGetAll);

//Get one Product - Public
router.get(
	"/:id",
	[
		check("id", "Invlid ID").isMongoId(),
		check("id").custom(categoryExists),
		validarCampos,
	],
	categoriesGetOne
);

//Create a new Product - Private - Token Valido
router.post(
	"/",
	[jwt_validation, check("name").not().isEmpty(), validarCampos],
	categoriesPost
);

//Update one Product - Private - Token Valido
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

//Delete Product - Admin -
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
