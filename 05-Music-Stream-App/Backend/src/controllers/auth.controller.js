const userSchema = require("../models/user.model");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


async function registerUser(req, res) {
  const { userName, email, password, role = "user" } = req.body;

  const isUserAlreadyExists = await userSchema.findOne({
    $or: [{ userName }, { email }],
    
  });


  if (isUserAlreadyExists) {
    return res
      .status(409)
      .json({ message: "Username ya Email already exists" });
  }


  const hash = await bcrypt.hash(password, 10);

  const newUser = await userSchema.create({
    userName,
    email,
    password: hash,
    role,
  });

  const token = jsonwebtoken.sign(
    {
      id: newUser._id,
      role: newUser.role,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User Register Successfully",
    user: {
      id: newUser._id,
      userName: newUser.userName,
      email: newUser.email,
      password: newUser.password,
      role: newUser.role,
    },
  });
}

async function loginUser(req, res) {
  const { userName, email, password } = req.body;

  const user = await userSchema.findOne({
    $or: [{ userName }, { email }],
  });
  if (!user) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }


  const isPasswordValid = await bcrypt.compare(password, user.password);




  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }

  const token = jsonwebtoken.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "Login Successfully",
    user: {
      id: user._id,
      userName: user.userName,
      email: user.email,
      role: user.role,
    },
  });
}

module.exports = { registerUser, loginUser };
