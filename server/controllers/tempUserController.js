const TempUser = require("../models/tempUser");
const User = require('../models/user');
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const sendOTPEmail = (userEmail, otp) => {
  const htmlContent = `<!DOCTYPE html>
                        <html lang="en">
                        <head>
                        <meta charset="UTF-8">
                        <title>Samwaad OTP Verification</title>
                        <style>
                            body {
                            margin: 0;
                            padding: 0;
                            background-color: #4CAF93;
                            font-family: Arial, sans-serif;
                            }
                            .container {
                            max-width: 600px;
                            margin: 20px auto;
                            background: #ffffff;
                            border-radius: 10px;
                            overflow: hidden;
                            box-shadow: 0 2px 6px rgba(0,0,0,0.1);
                            }
                            .header {
                            background: #4CAF93;
                            color: #ffffff;
                            text-align: center;
                            padding: 20px;
                            font-size: 24px;
                            font-weight: bold;
                            }
                            .body {
                            padding: 30px;
                            color: #333333;
                            font-size: 16px;
                            line-height: 1.6;
                            }
                            .otp-box {
                            margin: 20px 0;
                            padding: 15px;
                            text-align: center;
                            font-size: 28px;
                            font-weight: bold;
                            color: #4CAF93;
                            border: 2px dashed #4CAF93;
                            border-radius: 8px;
                            background: #f0f5ff;
                            letter-spacing: 6px;
                            }
                            .footer {
                            background: #f4f6f8;
                            text-align: center;
                            padding: 15px;
                            font-size: 12px;
                            color: #888888;
                            }
                        </style>
                        </head>
                        <body>
                        <div class="container">
                            <div class="header">Samwaad</div>
                            <div class="body">
                            <p>Hello,</p>
                            <p>Thank you for signing up with <strong>Samwaad</strong>! To complete your verification, please use the OTP below:</p>
                            <div class="otp-box">${otp}</div>
                            <p>This OTP will expire in <strong>5 minutes</strong>. Please do not share it with anyone.</p>
                            <p>If you didn’t request this, you can ignore this email.</p>
                            <p>– The Samwaad Team</p>
                            </div>
                            <div class="footer">
                            © 2025 Samwaad. All rights reserved.
                            </div>
                        </div>
                        </body>
                        </html>
    `;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: `${process.env.EMAIL}`,
      pass: `${process.env.PASSWORD}`,
    },
  });

  (async () => {
    const info = await transporter.sendMail({
      from: `"Samwaad" <${process.env.EMAIL}>`,
      to: userEmail,
      subject: "Verify your E-mail",
      html: htmlContent,
    });

    console.log("Message sent:", info.messageId);
  })();
};

const createTempUser = async (req, res) => {
  const { userEmail } = req.body;

  if (!userEmail)
    return res
      .status(400)
      .json({ success: false, message: "Email is missing" });

  const otp = 1000 + Math.floor(Math.random() * 9000);
  const hashedOTP = await bcrypt.hash(String(otp), 10);

  try {
    const user = await User.findOne({userEmail});

    if(user){
      return res.json({"message":"Email is already taken"});
    }

    const temporaryUser = await TempUser.findOne({ email: userEmail });

    if (temporaryUser) {

      temporaryUser.hashedOTP = hashedOTP;
      temporaryUser.otpExpiresAt = Date.now();
      await temporaryUser.save();
      
    } 
    else {
      await TempUser.create({
        email: userEmail,
        hashedOTP,
      });
    }

    sendOTPEmail(userEmail, otp);

    return res
      .status(200)
      .json({ success: true, message: "User created successfully" });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
};

const verifyOTP = async (req, res) => {
  const { userEmail, OTP } = req.body;

  try {
    const temporaryUser = await TempUser.findOne({ email: userEmail });

    bcrypt.compare(OTP, temporaryUser.hashedOTP, async function (err, result) {
      if (result === true) {
        if (Date.now() - temporaryUser.otpExpiresAt > 1000 * 60 * 5) {
          return res
            .status(200)
            .json({ success:false, message: "Time limit exceeded" });
        }
        temporaryUser.isVerified = true;
        await temporaryUser.save();

        return res
          .status(200)
          .json({ success: true, message:"OTP matched successfully" });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "OTP did not matched" });
      }
    });
  } catch (err) {
    console.error("Error : " + err.message);
  }
};

module.exports = { createTempUser, verifyOTP };
