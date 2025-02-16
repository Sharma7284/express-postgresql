const { where } = require("sequelize");
const User = require(`../models/user.model`);

// Get all users list
module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({ order: [["createdAt", "DESC"]] });

    res.status(200).json({ message: `All User List`, users });
  } catch (error) {
    res
      .status(500)
      .json({ error: error?.message || error || `Internal Server Error` });
  }
};

// Get user by id
module.exports.getUserById = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;

    const user = await User.findOne({ where: { id } });

    res.status(200).json({ message: `User`, user });
  } catch (error) {
    res
      .status(500)
      .json({ error: error?.message || error || `Internal Server Error` });
  }
};

// Update user address
module.exports.updateAddress = async (req, res, next) => {
  try {
    const {
      params: { id },
      body: { address },
    } = req;

    console.log(address);

    const updateStatus = await User.update({ address }, { where: { id } });

    if (updateStatus[0] === 1) {
      const user = await User.findOne({ where: { id } });
      res.status(200).json({ message: `User Address Updated`, user });
    } else {
      throw new Error(`Address Updation Failed`);
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: error?.message || error || `Internal Server Error` });
  }
};

// Update user aadhar number
module.exports.updateAadharNumber = async (req, res, next) => {
  try {
    const {
      params: { id },
      body: { aadharNumber },
    } = req;

    const updateStatus = await User.update({ aadharNumber }, { where: { id } });

    if (updateStatus[0] === 1) {
      const user = await User.findOne({ where: { id } });
      res.status(200).json({ message: `User Aadhar Number Updated`, user });
    } else {
      throw new Error(`Aadhar Number Updation Failed`);
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: error?.message || error || `Internal Server Error` });
  }
};

// Update user pan number
module.exports.updatePanNumber = async (req, res, next) => {
  try {
    const {
      params: { id },
      body: { panNumber },
    } = req;

    const updateStatus = await User.update({ panNumber }, { where: { id } });

    if (updateStatus[0] === 1) {
      const user = await User.findOne({ where: { id } });
      res.status(200).json({ message: `User Pan Number Updated`, user });
    } else {
      throw new Error(`Pan Number Updation Failed`);
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: error?.message || error || `Internal Server Error` });
  }
};
