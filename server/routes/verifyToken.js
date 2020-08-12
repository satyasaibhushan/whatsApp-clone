const jwt = require("jsonwebtoken");

const tokenVerifier = (token,callback) => {
  if (!token) callback("Acess Denied");
  try{
     const verifiedUser = jwt.verify(token,process.env.TOKEN_SECRET)
     return verifiedUser
  }
  catch(err){
     callback("Invalid Token")
  }
};

module.exports=tokenVerifier
