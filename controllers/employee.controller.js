const Employee = require("../models/employee.model");

module.exports.createNewEmployee = async (req, res, next) => {
  try {
    const {
      body: { firstName, lastName, email, phoneNumber, role, department },
    } = req;

    const employee = await Employee.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      role,
      department,
    });

    res.status(201).json({ message: "Employee Created", employee });
  } catch (error) {
    res
      .status(500)
      .json({ error: error?.message || error || `Internal Server Error` });
  }
};
module.exports.getAllEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.findAll();
    res.status(201).json({ message: "All Employees List", employees });
  } catch (error) {
    res
      .status(500)
      .json({ error: error?.message || error || `Internal Server Error` });
  }
};
