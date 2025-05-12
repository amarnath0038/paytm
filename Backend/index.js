require('dotenv').config();
const { MONGODB_URL, PORT } = require("./config");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { rootRouter } = require("./routes/index");

const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", // change if different
  credentials: true               // important if using cookies/sessions
}));


app.use("/api/v1", rootRouter);

//const PORT = process.env.PORT || 3000;
//const MONGODB_URL = process.env.MONGODB_URL;

async function main() {
  try {
    console.log("MONGO_URL:", process.env.MONGODB_URL);

    await mongoose.connect(MONGODB_URL, { dbName: "paytm" });
    console.log("Successfully connected to database");
    app.listen(PORT, () => {
      console.log(`Listening to port: ${PORT}`);
    });
  } catch(err) {
    console.error("Error connecting to database: ", err);
    process.exit(1);
  }
}

main();



