import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

/**
 * Send an email using nodemailer (Read & Return)
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} html - Email body (HTML format)
 */
const sendEmail = async (to, subject, html) => {
  try {
    // Configure email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Sender email (Read & Return)
        pass: process.env.EMAIL_PASS, // App password
      },
    });

    const mailOptions = {
      from: `"Read & Return 📚" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent successfully to ${to}`);
  } catch (error) {
    console.error(`❌ Error sending email: ${error.message}`);
    throw new Error("Failed to send email. Please try again later.");
  }
};

export default sendEmail;
