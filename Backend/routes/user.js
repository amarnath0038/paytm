const express = require("express");
const userRouter = express.Router();

const jwt = require("jsonwebtoken");

const { UserModel, AccountModel } = require("../db");
const { signupSchema, signinSchema, updateUserSchema } = require("../validators/auth.validator");

const { z } = require("zod");
const bcrypt = require("bcrypt");


const { JWT_USER_PASSWORD } = require("../config");
const { userMiddleware } = require("../middlewares/user");



async function userSignup(req, res) {
  const parsedDataWithSuccess = signupSchema.safeParse(req.body);
  if (!parsedDataWithSuccess.success) {
    const whatIsWrong = parsedDataWithSuccess.error.issues.map(issue => (`${issue.path[0]} is invalid: ${issue.message}`));
    res.status(401).json({message: "Incorrect data format", errors: whatIsWrong});
    return;
  }

  const { username, name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 5);

  try {
    const user = await UserModel.create({username, name, email, password: hashedPassword});
    const userId = user._id;
    await AccountModel.create({userId, balance: 10000});
    res.json({message: "You are successfully signed up"});
  } catch(err) {
    res.status(401).json({ message: "Error while signing up", err});
    return;
  }
}

async function userSignin(req, res) {
  const parsedDataWithSuccess = signinSchema.safeParse(req.body);
  if (!parsedDataWithSuccess.success) {
    const whatIsWrong = parsedDataWithSuccess.error.issues.map(issue => (`${issue.path[0]} is invalid: ${issue.message}`));
    res.status(401).json({message: "Incorret data format", errors: whatIsWrong});
    return;
  }

  const { email, username, password } = req.body;
  const identifier = email || username;
  try {
    const user = await UserModel.findOne({ $or: [{ email: identifier }, { username: identifier }]});
    //const user = await UserModel.findOne({email})
    if (!user) {
      res.status(401).json({ message: "User not found"});
      return;
    }
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch){
      res.status(401).json({ message: "Wrong password"});
      return;
    } 

    const token = jwt.sign({ id: user._id }, JWT_USER_PASSWORD)
    res.json({ message: "You are successfully signed in", token: token});

    } catch(err) {
      console.error("Signin error: ",err);
      res.status(500).json({ message: "Something went wrong. Please try again"});
  }
}


async function updateUserDetails(req, res) {
  console.log("body:", req.body);
  const parsedDataWithSuccess = updateUserSchema.safeParse(req.body);
  if (!parsedDataWithSuccess) {
    const whatIsWrong = parsedDataWithSuccess.error.issues.map(issue => (`${issue.path[0]} is invalid: ${issue.message}`));
    res.status(401).json({message: "Incorret data format", errors: whatIsWrong});
    return;
  }

  console.log("Parsed Data:", parsedDataWithSuccess);


  const updates = parsedDataWithSuccess.data;

  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, 5);
  }

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true }
    );
    res.json({ message: "User updated successfully", user: updatedUser });
  } catch(err) {
    console.error("Update error: ", err);
    res.status(500).json({ message: "Error during update" });
  }
}

async function getAllUsersWithName(req, res) {
  const searchItem = req.query.name;
  if (!searchItem || searchItem.trim().length === 0) {
    res.status(400).json({ message: "Search(name) item is required" });
    return;
  }

  try {
    const users = await UserModel.find({
      name: { $regex: searchItem, $options: "i" }
    }).select("-password");
    res.json({ users: users });
  } catch(err) {
    res.status(500).json({ message: "Search failed", error: err.message });
  }
}


userRouter.post("/signup", userSignup);


userRouter.post("/signin", userSignin);


userRouter.put("/update", userMiddleware, updateUserDetails);


userRouter.get("/bulk", userMiddleware, getAllUsersWithName);












module.exports = { userRouter };

