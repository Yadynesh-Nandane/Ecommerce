import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  // const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "google",
    port: 587,
    // secure: false,
    auth: {
      user: "mymailforeducation666@gmail.com",
      pass: "Deadeye@144",
    },
  });

  const mailOptions = {
    from: "mymailforeducation666@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
