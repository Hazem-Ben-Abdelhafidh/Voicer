const router = require("express").Router();
const authController = require("./../controllers/authController");
router.post("/signup", authController.signup);
router.get("/refreshToken", authController.refreshToken);
module.exports = router;
