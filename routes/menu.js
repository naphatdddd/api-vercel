const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");

//http://127.0.0.1:3000/api/staff
router.get("/", menuController.index);

// //http://127.0.0.1:3000/api/staff
// router.post("/", menuController.insert);

// //http://127.0.0.1:3000/api/staff
// router.get("/:id", menuController.show);

// //http://127.0.0.1:3000/api/staff
// router.delete("/:id", menuController.destroy);

// //http://127.0.0.1:3000/api/staff
// router.put("/:id", menuController.update);

module.exports = router;
