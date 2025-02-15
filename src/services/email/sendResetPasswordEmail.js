const jwt = require("jsonwebtoken");
const transporter = require("./mailTransport");
const config = require("@/config");

async function sendResetPasswordEmail(email, id) {
  const token = jwt.sign(
    {
      id,
      exp: Math.floor((Date.now() + config.jwt.passwordResetDuration) / 1000),
    },
    process.env.JWT_SECRET
  );

  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Boardly Password Reset",
    html: `<a target="_blank" href="${process.env.HTTP_CLIENT}${process.env.HTTP_CLIENT_PATH}/auth/reset?token=${token}">reset password</a>`,
  });
}

module.exports = sendResetPasswordEmail;
