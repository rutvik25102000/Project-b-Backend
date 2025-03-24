import User from "../models/AuthModel.js";
import nodemailer from "nodemailer";
import dotenv from 'dotenv';
import crypto from "crypto";
dotenv.config();

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD, // Use App Password, not your actual password
    },
});

// Generate OTP function
const generateOTP = () => {
    return crypto.randomInt(100000, 999999).toString(); // 6-digit OTP
};

// Send OTP API
export const sendOTP = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    try {
        let user = await User.findOne({ email });

        if (!user) {
            user = new User({ email });
        }

        const otp = generateOTP();
        user.otp = otp;
        user.otpExpires = Date.now() + 5 * 60 * 1000; // OTP expires in 5 minutes

        await user.save();

        // ✅ Send OTP Email
        const mailOptions = {
            from: `"Rutvik Patil" <${process.env.SMTP_USER}>`,  // Sender name and email
            to: email,
            subject: "Your One-Time Password (OTP) for Login",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 500px; border: 1px solid #ddd; border-radius: 8px;">
                    <h2 style="color: #333;">Login OTP Verification</h2>
                    <p>Dear User,</p>
                    <p>Use the following One-Time Password (OTP) to log into your account:</p>
                    <h3 style="background-color: #f4f4f4; padding: 10px; display: inline-block; border-radius: 5px;">
                        <strong>${otp}</strong>
                    </h3>
                    <p>This OTP is valid for <strong>10 minutes</strong>. Do not share this code with anyone.</p>
                    <p>If you did not request this login attempt, please ignore this email or contact our support team immediately.</p>
                    <br>
                    <p>Best regards,</p>
                    <p><strong>Rutvik Patil</strong></p>
                    <p>Support: <a href="mailto:ap0152782@example.com">ap0152782@example.com</a></p>
                </div>
            `,
        };
        

        // Sending Email
        const info = await transporter.sendMail(mailOptions);
        console.log("OTP:", otp);

        return res.json({ message: "OTP sent to email" });

    } catch (error) {
        console.error("Error sending OTP:", error);
        return res.status(500).json({ message: "Server error", error });
    }
};




export const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: "Email and OTP are required" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        user.isVerified = true;
        user.otp = null;
        user.otpExpires = null;
        await user.save();

        res.json({ message: "OTP verified successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}