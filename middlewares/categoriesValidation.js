const { Category } = require("../models");

const nameToUpperCase = (req, res, next) => {
	req.body.name = req.body.name.toUpperCase();
	next();
};

const categoryNameExists = async (name) => {
	const categoryWithName = await Category.findOne({ name });
	if (categoryWithName != null) {
		throw new Error(`${name} already exists.`);
	}
};

module.exports = { categoryNameExists, nameToUpperCase };
