const sendVerificationEmail = require("@/services/email/sendVerificationEmail");
const User = require("@/models/User");

module.exports = async (req, res, next) => {
  const { username, password, email } = req.body;

  try {
    const usernameTaken = await User.findOne({ username });
    if (usernameTaken) {
      req.log("username, 409, sent");
      return res.status(409)._feedback(["username", "Username is taken"]);
    }

    const emailTaken = await User.findOne({ email });
    if (emailTaken) {
      req.log("email, 409, sent");
      return res.status(409)._feedback(["email", "Email is already in use"]);
    }

    const newUser = new User({ email, username });
    await sendVerificationEmail(email, newUser._id.toString());

    await newUser.setPassword(password);
    await newUser.save();

    req.log("email sent, user created, 200");
    return res.status(200).end();
  } catch (err) {
    console.log(err);
    next(err);
  }
};
