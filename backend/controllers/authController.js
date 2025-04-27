import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exist" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.log("Error during signup: ", error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ message: "User do no exist please signup" });

    if(password === "") return res.status(400).json({message: "password cannot be empty"})
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword)
      return res.status(400).json({ message: "Wrong Password" });

    const token = generateToken(user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    res.status(500).json({message: "Internal Server Error"});
    console.log("Error during logging In: ", error)
  }
};

// get logged In User
export const getProfile = async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
}