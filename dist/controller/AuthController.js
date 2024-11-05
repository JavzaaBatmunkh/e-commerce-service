"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtp = exports.generateOtp = exports.login = exports.register = void 0;
exports.checkAuth = checkAuth;
const UserModel_1 = require("../model/UserModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const OTPModel_1 = require("../model/OTPModel");
const nodemailer_1 = __importDefault(require("nodemailer"));
const SALT_SECRET = process.env.SALT_SECRET || "";
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "";
const GOOGLE_SECRET = process.env.GOOGLE_SECRET || "";
const register = async (req, res) => {
    try {
        const createdAt = new Date().toISOString();
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt_1.default.hash(String(password), Number(SALT_SECRET));
        await UserModel_1.UserModel.create({ name, email, password: hashedPassword, createdAt });
        res.status(201).json({ message: "Successfully registered!" });
    }
    catch (error) {
        res.status(400).json({ message: "Registration failed!" });
        console.error(error);
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required!" });
        }
        const user = await UserModel_1.UserModel.findOne({ email });
        if (!user)
            return res.status(401).json({ message: "User not found!" });
        const isEqual = await bcrypt_1.default.compare(password, user.password);
        if (isEqual) {
            const authtoken = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email }, ACCESS_TOKEN_SECRET, { expiresIn: "2h" });
            return res.json({ authtoken });
        }
        res.status(403).json({ message: "Password is incorrect!" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred during login.", error });
    }
};
exports.login = login;
function checkAuth(req, res, next) {
    const authtoken = req.headers["authtoken"];
    console.log({ authtoken });
    if (!authtoken) {
        return res.sendStatus(403);
    }
    if (!jsonwebtoken_1.default.verify(authtoken + "", ACCESS_TOKEN_SECRET)) {
        return res.sendStatus(403);
    }
    next();
}
const generateOtp = async (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(Math.random() * 8999) + 1000;
    try {
        await OTPModel_1.OtpModel.create({ email, otp });
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: '88delgeree@gmail.com',
                pass: GOOGLE_SECRET,
            },
        });
        await transporter.sendMail({
            from: '88delgeree@gmail.com',
            to: email,
            subject: 'OTP Verification',
            html: `<p>Your OTP for verification is: <b>${otp}</b></p>`
        });
        res.status(200).send('OTP sent successfully');
    }
    catch (error) {
        console.error(error);
        res.status(400).send('OTP send failed.');
    }
};
exports.generateOtp = generateOtp;
const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const otpRecord = await OTPModel_1.OtpModel.findOne({ email, otp }).exec();
        if (otpRecord) {
            res.status(200).send('OTP verified successfully');
        }
        else {
            res.status(400).send('Invalid OTP');
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error verifying OTP');
    }
};
exports.verifyOtp = verifyOtp;
