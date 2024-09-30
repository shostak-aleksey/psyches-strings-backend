const nodemailer = require("nodemailer");

const sendConfirmationEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Подтверждение регистрации",
    text: `Пожалуйста, подтвердите вашу регистрацию, перейдя по следующей ссылке: ${process.env.CLIENT_URL}/confirm/${token}`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendConfirmationEmail };
