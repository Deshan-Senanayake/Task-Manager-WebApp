const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");

const { createTask, getTasks, updateTask, deleteTask, exportTasksToPDF } = require("../controllers/taskController");


router.use(authMiddleware); // All routes below require JWT

router.post("/", taskController.createTask);
router.get("/", taskController.getTasks);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);
router.get("/pdf", exportTasksToPDF);

module.exports = router;
