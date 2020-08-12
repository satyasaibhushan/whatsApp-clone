const router = require("express").Router();
const User = require("../model/user");
const { registrationValidation, loginValidation, isEmail } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { json } = require("express");

router.post("/register", async (req, res) => {
  const { error } = registrationValidation(req.body);
  if (error) return res.status(400).send(JSON.stringify(error.details[0].message));

  //check if user/email already exists
  const doesEmailexists = await User.findOne({ email: req.body.email });
  if (doesEmailexists) return res.status(400).send(JSON.stringify('Email already exists'));

  const doesUserexists = await User.findOne({ name: req.body.name });
  if (doesUserexists) return res.status(400).send(JSON.stringify('user name is taken.Please try a different one'));

  //Hashing of passwords
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
  });
  try {
    await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

//login
router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(JSON.stringify(error.details[0].message));

  //checking if given data is email/name
  const { error: isEmailGivenError } = isEmail(req.body);
  const user = !isEmailGivenError
    ? await User.findOne({ email: req.body.loginID })
    : await User.findOne({ name: req.body.loginID });

  if (!user) return res.status(400).send(JSON.stringify("Email or password is invalid"));
  else {
    //validating password
    const validPassword = await bcrypt.compare(req.body.password,user.password)
    if(!validPassword) return res.status(400).send(JSON.stringify("Email or password is invalid"))
    //json web token genereation
    const token = jwt.sign({_id:user.id}, process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(JSON.stringify(token))
  }
});

module.exports = router;
