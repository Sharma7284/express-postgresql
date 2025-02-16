const express = require(`express`);
const {
  createNewApplication,
  getAllApplications,
} = require("../controllers/application.controller");

const router = express.Router();

router.get(`/`, getAllApplications);
router.post(`/create-new-application`, createNewApplication);

module.exports = router;
