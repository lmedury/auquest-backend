const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Generate and store OTP for email
const emailOTPMap = new Map();

// Nodemailer setup
const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  secure: true, 
  secureConnection: false,
  tls: {
    ciphers: "SSLv3",
  },
  requireTLS: true,
  port: 465,
  debug: true,
  connectionTimeout: 10000,
  auth: {
    user: "auquest@lalithmedury.com",
    pass: "Pk$R*9QQwn5Z"
  },
});

const router = express.Router();

// Endpoint to send OTP to email
router.post('/send-otp', (req, res) => {
  const { email } = req.body;

  // Generate a random 6-digit OTP
  const otp = generateOTP();

  // Store the OTP in memory with the associated email
  emailOTPMap.set(email, otp);

  // Send email with OTP
  sendOTPEmail(email, otp)
    .then(() => {
      res.json({ success: 'OTP sent successfully.' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Failed to send OTP.' });
    });
});

// Validate the received OTP
router.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  // Check if email exists in the map
  if (!emailOTPMap.has(email)) {
    console.log('Invalid email or OTP')
    return res.status(400).json({ error: 'Invalid email or OTP expired.' });
  }

  // Validate the OTP
  if (otp === emailOTPMap.get(email)) {
    // Clear the OTP from memory after successful validation
    emailOTPMap.delete(email);
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, error: 'Invalid OTP.' });
  }
});

// Function to generate a random 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Function to send OTP via email
function sendOTPEmail(email, otp) {
  const mailOptions = {
    from: process.env.TEST_EMAIL, // Replace with your email
    to: email,
    subject: 'Your OTP for Verification',
    text: `Your OTP is: ${otp}`,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = router;