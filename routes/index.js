const express = require(`express`);

const authRoutes = require(`./auth.route`);
const userRoutes = require(`./user.route`);
const applicationRoutes = require(`./application.route`);
const employeeRoutes = require(`./employee.model`);

const router = express.Router();

router.use(`/auth`, authRoutes);
router.use(`/users`, userRoutes);
router.use(`/applications`, applicationRoutes);
router.use(`/employees`, employeeRoutes);

module.exports = router;
