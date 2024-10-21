const nodemailer = require("nodemailer");
// import nodemailer from "nodemailer";

const userGmail = "pplanluis2005@gmail.com";
const passAppGmail = "hdrs hhsq zcax ndgi";

export const sendEmail = (to, subject, body) => {
  // Set up Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: userGmail,
      pass: passAppGmail,
    },
  });

  // Define a route for sending emails
  // Set up email options
  const mailOptions = {
    from: userGmail,
    to: to,
    subject: subject,
    html: body
  };

  return new Promise((resolve, reject) => {
    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      }
      resolve(info);
    });
  })
}