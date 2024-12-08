const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
let usersCache = {};
const signup = async (req, res) => {
  usersCache = {};
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email." });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: password,
    });

    await user.save();

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User created successfully!",
      userId: user._id,
      data: user,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};

const login = async (req, res) => {
  usersCache = {};
  try {
    const { email, password } = req.body;

    console.log(`Login attempt for email: ${email}`);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials2" });
    }

    console.log(await bcrypt.compare(password, user.password));

    const payload = { userId: user._id.toString() };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "8h",
    });

    res.status(200).json({
      message: "Login successful!",
      userId: user._id,
      data: user,
      token,
    });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};

const searchUsers = async (req, res) => {
  try {
    const { searchTerm } = req.query;

    if (Object.keys(usersCache).length === 0) {
      const users = await User.find({});
      users.forEach((user) => {
        usersCache[user.email] = user;
      });
    }

    const results = Object.values(usersCache).filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return res.status(200).json({ results });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  signup,
  login,
  searchUsers,
};
