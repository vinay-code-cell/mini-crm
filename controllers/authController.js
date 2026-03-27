const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Trim whitespace and convert email to lowercase
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    // Check if user already exists
    const existingUser = await User.findOne({ email: trimmedEmail });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashed = await bcrypt.hash(trimmedPassword, 10);

    const user = await User.create({
      email: trimmedEmail,
      password: hashed
    });

    res.json({ message: "User registered successfully", email: user.email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LOGIN
// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Trim whitespace and convert email to lowercase
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    console.log("Entered Email:", trimmedEmail);
    console.log("Entered Password:", trimmedPassword);

    const user = await User.findOne({ email: trimmedEmail });

    console.log("User from DB:", user);

    if (!user) return res.status(400).json({ error: "User not found" });

    if (!user.password) {
      return res.status(400).json({ error: "User password missing in DB" });
    }

    // TEMP FIX: Plain text password check
    if (trimmedPassword !== user.password) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: error.message });
  }
};