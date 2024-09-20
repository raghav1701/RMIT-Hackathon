const { model } = require("mongoose");
const nodemailer = require("nodemailer");

const sendEmail = async (option) => {
  // CREATE A TRANSPORTER
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: "raghavagarwal665@gmail.com",
      pass: "xjen uwsz kmef amcw",
    },
  });

  // DEFINE EMAIL OPTIONS
  const emailOptions = {
    to: option.email,
    subject: option.subject,
    text: option.message,
  };

  await transporter.sendMail(emailOptions);
};

module.exports = sendEmail;
