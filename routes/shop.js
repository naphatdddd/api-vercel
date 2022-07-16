const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shopController");

//http://127.0.0.1:3000/api/staff
router.get("/", shopController.index);

//http://127.0.0.1:3000/api/staff
router.post("/", shopController.insert);

//http://127.0.0.1:3000/api/staff
router.get("/:id", shopController.getShopById);

// //http://127.0.0.1:3000/api/staff
// router.delete("/:id", shopController.destroy);

// //http://127.0.0.1:3000/api/staff
// router.put("/:id", shopController.update);

module.exports = router;
