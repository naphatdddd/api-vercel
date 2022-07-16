const User = require("../models/user");
const { validationResult } = require("express-validator");
const config = require("../config/index");
const jwt = require("jsonwebtoken");

exports.index = async (req, res, next) => {
  try {
    const user = await User.find().sort({ _id: -1 });
    res.status(200).json({
      result: user,
    });
  } catch (error) {
    next(error);
  }
};

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const existEmail = await User.findOne({ email: email });
    if (existEmail) {
      const error = new Error("อีเมล์ซ้ำในระบบ");
      error.statusCode = 400;
      throw error;
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("รูปแบบไม่ถูกต้อง");
      error.statusCode = 400;
      error.validation = errors.array();
      throw error;
    }
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = await user.encryptPassword(password);
    user.role = role;

    await user.save();
    res.status(200).json({
      message: "สมัครสมาชิกเรียบร้อย",
    });
  } catch (error) {
    next(error);
  }
};
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("ไม่พบข้อมูลในระบบ");
      error.statusCode = 400;
      throw error;
    }

    const isValid = await user.checkPassword(password);
    if (!isValid) {
      const error = new Error("รหัสผ่านไม่ถูกต้อง");
      error.statusCode = 400;
      throw error;
    }
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      config.JWT_SECRET,
      { expiresIn: "30m" }
    );
    const expried_in = await jwt.decode(token);

    res.status(200).json({
      access_token: token,
      expried_in: expried_in.exp,
      tokenType: "Bearer",
    });
  } catch (error) {
    next(error);
  }
};

exports.destroy = async (req, res, next) => {
  try {
    const user = await User.deleteMany();
    res.status(200).json({
      message: "ลบข้อมูลเรียบร้อย",
    });
  } catch (error) {
    next(error);
  }
};

exports.me = async (req, res, next) => {
  try {
    const { _id, name, email, role } = req.user;
    res.status(200).json({
      result: {
        id: _id,
        name: name,
        email: email,
        role: role,
      },
    });
  } catch (error) {
    next(error);
  }
};
