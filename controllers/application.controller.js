const Application = require("../models/application.model");
const User = require("../models/user.model");

module.exports.createNewApplication = async (req, res, next) => {
  try {
    const {
      body: { userId, loanType, loanAmount, interestRate, tenureMonths },
    } = req;

    const application = await Application.create({
      userId,
      loanType,
      loanAmount,
      interestRate,
      tenureMonths,
    });

    res.status(201).json({ message: "Application Created", application });
  } catch (error) {
    res
      .status(500)
      .json({ error: error?.message || error || `Internal Server Error` });
  }
};
module.exports.getAllApplications = async (req, res, next) => {
  try {
    const application = await Application.findAll({
      include: {
        model: User,
        attributes: [
          "id",
          "username",
          "name",
          "email",
          "isAadharKYC",
          "isPanKYC",
        ],
      },
    });
    res.status(201).json({ message: "All Applications List", application });
  } catch (error) {
    res
      .status(500)
      .json({ error: error?.message || error || `Internal Server Error` });
  }
};
