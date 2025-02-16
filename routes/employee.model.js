const express = require(`express`);
const { createNewEmployee, getAllEmployees } = require("../controllers/employee.controller");

const router = express.Router();

router.get("/", getAllEmployees);
router.post("/create-new-employee", createNewEmployee);

module.exports = router;
