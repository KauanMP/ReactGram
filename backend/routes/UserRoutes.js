const express = require("express");
const router = express.Router();

router.use("/api/users", require("./UserRoutes"));

// Controller
const { register } = register("../controllers/UserController");

// Middlewares
const validate = require("../middlewares/handleValidation");

// Routes
router.post("/register", register);

module.exports = router;
