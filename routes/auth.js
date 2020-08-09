const router = require("express").Router();
const User = require("../model/user");
const { registrationValidation } = require("../validation");

router.post("/register", async (req, res) => {
  const { error } = registrationValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if user/email already exists
  const doesEmailexists = await User.findOne({ email: req.body.email });
  if (doesEmailexists) return res.status(400).send("Email already exists");

  const doesUserexists = await User.findOne({ name: req.body.name });
  if (doesUserexists) return res.status(400).send("user name is taken.Please try a different one");

  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
