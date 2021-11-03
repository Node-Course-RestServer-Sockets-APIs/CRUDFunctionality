const jsonwebtoken = require("jsonwebtoken");

const generarJWT = (uid) => {
	return new Promise((resolve, reject) => {
		const payload = { uid };
		jsonwebtoken.sign(
			payload,
			process.env.PRIVATE_KEY,
			{ expiresIn: "3h" },
			(err, token) => {
				if (err) {
					console.log(err);
					reject("Failure creating token.");
				} else {
					resolve(token);
				}
			}
		);
	});
};

module.exports = { generarJWT };
