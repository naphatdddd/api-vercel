const Staff = require("../models//staff");
const config = require('../config/index')

exports.index = async (req, res, next) => {
  try {
    const staff = await Staff.find();
    res.status(200).json({
      result: staff,
    });
  } catch (error) {
    next(error);
  }
};
exports.insert = async (req, res, next) => {
  try {
    const { name, salary } = req.body;
    const existName = await Staff.findOne({ name: name });
    if (existName) {
      const error = new Error("มีผู้ใช้งานแล้ว");
      error.statusCode = 400;
      throw error;
    }
    const staff = new Staff({
      name: name,
      salary: salary,
    });
    await staff.save();
    res.status(200).json({
      message: "บันทึกสำเร็จ",
    });
  } catch (error) {
    next(error);
  }
};
exports.show = async (req, res, next) => {
  try {
    const { id } = req.params;

    // const staff = await Staff.findOne({ _id: id });
    const staff = await Staff.findById(id);

    res.status(200).json({
      result: staff,
    });
  } catch (error) {
    next(error);
  }
};

exports.destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existId = await Staff.findOne({ _id: id });
    if (!existId) {
      const error = new Error("ไม่พบข้อมูลในระบบ");
      error.statusCode = 400;
      throw error;
    }
    const staff = await Staff.findOneAndDelete({ _id: id });
    res.status(200).json({
      message: "ลบข้อมูลเรียบร้อยแล้ว",
    });
  } catch (error) {
    next(error);
  }
};
exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, salary } = req.body;

    // const staff = await Staff.findById(id);
    // staff.name = name;
    // staff.salary = salary;
    // await staff.save();

    // const staff = await Staff.findByIdAndUpdate(id, { name, salary });

    const staff = await Staff.updateOne(
      { _id: id },
      { name: name, salary: salary }
    );
    
    res.status(200).json({
      messgae: "อัปเดตเรียบร้อยแล้ว",
    });
  } catch (error) {
    next(error);
  }
};
