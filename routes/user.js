const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const userController = require("../controllers/userController");
const passportJWT = require("../middleware/passportJWT");
//http://127.0.0.1:3000/api/staff
router.get("/", userController.index);

//http://127.0.0.1:3000/api/user/register
router.post(
  "/register",
  [
    body("name").not().isEmpty().withMessage("กรอกชื่อสกุล"),
    body("email")
      .not()
      .isEmpty()
      .withMessage("กรอกอีเมล์")
      .isEmail()
      .withMessage("รูปแบบอีเมล์ไม่ถูกต้อง"),
    body("password")
      .not()
      .isEmpty()
      .withMessage("กรอกรหัสผ่าน")
      .isLength({ min: 3 })
      .withMessage("รหัสผ่าน3ตัวขึ้นไป"),
  ],
  userController.register
);

//http://127.0.0.1:3000/api/user/register
router.post("/login", userController.login);

//http://127.0.0.1:3000/api/staff
router.delete("/", userController.destroy);

//http://127.0.0.1:3000/api/staff
router.get("/me", [passportJWT.isLogin], userController.me);

module.exports = router;
