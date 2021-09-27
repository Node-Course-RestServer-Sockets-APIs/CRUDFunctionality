const { Router } = require("express");
const {
	userGet,
	userPut,
	userPost,
	userDelete,
} = require("../controllers/user.routes");

const router = new Router();

router.get("/", userGet);
router.put("/", userPut);
router.post("/", userPost);
router.delete("/", userDelete);

module.exports = router;
