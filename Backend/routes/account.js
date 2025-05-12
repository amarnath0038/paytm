const express = require("express");
const { userMiddleware } = require("../middlewares/user");
const { AccountModel, UserModel } = require("../db");
const { default: mongoose, isValidObjectId } = require("mongoose");
const accountRouter = express.Router();


async function getBalance(req, res) {
  try {
    const account = await AccountModel.findOne({ userId: req.user.id });
    if (!account) {
      res.status(404).json({ message: "Account not found" });
    }
    res.status(200).json({ balance: account.balance });
  } catch (err) {
    res.status(500).json({ message: "Error fetching balance", error: err.message});
  }
}


async function transferMoney(req, res) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const fromUserId = req.user.id;
    const { to, amount } = req.body;

    if (!isValidObjectId(to)) {
      throw new Error("Invalid recipient ID");
    }
  
    if (fromUserId === to) {
      throw new Error("What are u smoking buddy? You cannot send money to yourself")
    }

    if (amount <= 0) {
      throw new Error("Common! Are you trying to send no money now uhh")
    }

    const fromAccount = await AccountModel.findOne({ userId: fromUserId }).session(session);
    const toAccount = await AccountModel.findOne({ userId: to }).session(session);
    const recipientUser = await UserModel.findById(to).session(session);

    if (!toAccount || !recipientUser) {
      throw new Error("Account not found!");
    }
    console.log(fromAccount);
    

    if (fromAccount.balance < amount) {
      throw new Error("Insufficient balance!");
    }

    await AccountModel.updateOne({userId: fromUserId}, {$inc: {balance: -amount}}, {session});
    await AccountModel.updateOne({userId: to}, {$inc: {balance: amount}}, {session});

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: `Transferred ${amount} to ${recipientUser.name}`});
    
  } catch(err) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    session.endSession();
    res.status(400).json({ message: "Transaction failed", error: err.message});
  }
}


accountRouter.get("/balance", userMiddleware, getBalance);


accountRouter.post("/transfer", userMiddleware, transferMoney);


module.exports = { accountRouter };