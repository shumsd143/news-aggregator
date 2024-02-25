const { login, signUp } = require("../controllers/user.controller");
const preferenceRoutes = require("./preference.route");
const { authMiddleware } = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post("/signup", signUp);
router.post("/login", login);
router.use("/preferences", authMiddleware, preferenceRoutes);

module.exports = router;
