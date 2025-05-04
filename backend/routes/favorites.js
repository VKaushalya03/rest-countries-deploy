const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Middleware to check token
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Missing token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.email = decoded.email;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
};

// GET favorites
router.get("/", authenticate, async (req, res) => {
  const user = await User.findOne({ email: req.email });
  res.json(user.favorites || []);
});

// POST toggle a favorite
router.post("/toggle", authenticate, async (req, res) => {
  const { code } = req.body;
  const user = await User.findOne({ email: req.email });

  if (user.favorites.includes(code)) {
    user.favorites = user.favorites.filter((c) => c !== code);
  } else {
    user.favorites.push(code);
  }

  await user.save();
  res.json(user.favorites);
});

// DELETE all favorites
router.delete("/clear", authenticate, async (req, res) => {
  const user = await User.findOne({ email: req.email });
  user.favorites = [];
  await user.save();
  res.json([]);
});

module.exports = router;
