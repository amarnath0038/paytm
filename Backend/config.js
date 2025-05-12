require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD;
const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL;


module.exports = { JWT_SECRET, JWT_USER_PASSWORD, MONGODB_URL, PORT };