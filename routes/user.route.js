const express = require(`express`);
const {
  getAllUsers,
  getUserById,
  updateAddress,
  updateAadharNumber,
  updatePanNumber,
} = require("../controllers/user.controller");

const router = express.Router();

router.get(`/`, getAllUsers);
router.get(`/:id`, getUserById);
router.patch(`/update-address/:id`, updateAddress);
router.patch(`/update-aadhar-number/:id`, updateAadharNumber);
router.patch(`/update-pan-number/:id`, updatePanNumber);

module.exports = router;
