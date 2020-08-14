const jwt = require("jsonwebtoken");

const tokenVerifier = (token, callback) => {
  if (!token || token == undefined) callback("Acess Denied");
  else {
    try {
      const verifiedUser = jwt.verify(token, process.env.TOKEN_SECRET);
      return verifiedUser;
    } catch (err) {
      callback("Invalid Token");
    }
  }
};

module.exports = tokenVerifier;
