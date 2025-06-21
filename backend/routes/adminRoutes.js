const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

router.use(authMiddleware);     // All routes must be authenticated
router.use(adminMiddleware);    // All routes must be admin-only

router.get("/users", adminController.getAllUsers);
router.put("/users/:id", adminController.editUser);
router.delete("/users/:id", adminController.deactivateUser);

module.exports = router;
