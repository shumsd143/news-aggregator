const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { HASH_ROUNDS, JWT_SECRET_KEY } = require("../constants");
const { validateLoginSchema, validateSignUpSchema } = require("../utils");
const { create, get } = require("../services/user.service");

async function signUp(req, res) {
  const { error } = validateSignUpSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { name, email, password, preferences } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, HASH_ROUNDS);
    create({ name, email, password: hashedPassword, preferences });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function login(req, res) {
  const { error } = validateLoginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { email, password } = req.body;
  try {
    const user = await get(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ email: user.email }, JWT_SECRET_KEY, {
      expiresIn: "24h",
    });
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { signUp, login };
