const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");


function userMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    res.status(401).json({ message: "No token found" });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedInfo = jwt.verify(token, JWT_USER_PASSWORD);
    req.user = { id: decodedInfo.id };
    next();
  } catch(err) {
    res.status(401).json({ message: "You are not signed in" });
  }
}


module.exports = { userMiddleware };