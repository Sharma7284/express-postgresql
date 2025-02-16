const User = require(`../models/user.model`);
const bcrypt = require(`bcrypt`);

module.exports.registerUser = async (req, res, next) => {
  try {
    const {
      body: { username, name, email, phoneNumber, password, role },
    } = req;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) throw new Error(`User already exists.`);

    const user = await User.create({
      username,
      name,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ message: `User Created`, user });
  } catch (error) {
    res
      .status(500)
      .json({ error: error?.message || error || `Internal Server Error` });
  }
};
