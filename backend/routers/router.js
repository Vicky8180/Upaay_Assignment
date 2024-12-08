const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  searchUsers,
} = require("../controllers/Auth_controller");

const {
  createTask,
  fetchTasks,
  updateCategory,
} = require("../controllers/Task_controller");

const Auth = require("../middlewares/Auth");

router.post("/auth/register", signup);
router.post("/auth/login", login);
router.get("/search", searchUsers);

router.post("/task/create", Auth, createTask);
router.post("/task/fetch", Auth, fetchTasks);
router.post("/task/update-category", Auth, updateCategory);

module.exports = router;
