import express from "express";
import bcrypt from "bcrypt";
import User from "../Models/User.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashed,
    });

    await user.save();

    res.json({ message: "User Created Successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
