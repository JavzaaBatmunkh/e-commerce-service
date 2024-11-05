import { Request, Response, NextFunction } from "express"
import { UserModel } from "../model/UserModel"
import bcrypt from "bcrypt"
import "dotenv/config"
import jwt from "jsonwebtoken"
import { OtpModel } from "../model/OTPModel"
import nodemailer from 'nodemailer'

const SALT_SECRET = process.env.SALT_SECRET || ""
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "";
const GOOGLE_SECRET = process.env.GOOGLE_SECRET || ""
export const register = async (req: Request, res: Response) => {
    try {
        const createdAt = new Date().toISOString()
        const { name, email, password } = req.body
        const hashedPassword = await bcrypt.hash(String(password), Number(SALT_SECRET))
        await UserModel.create({ name, email, password: hashedPassword, createdAt })
        res.status(201).json({ message: "Successfully registered!" });
    } catch (error) {
        res.status(400).json({ message: "Registration failed!" });
        console.error(error)
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required!" });
        }

        const user = await UserModel.findOne({ email });
        if (!user) return res.status(401).json({ message: "User not found!" });

        const isEqual = await bcrypt.compare(password, user.password);
        if (isEqual) {
            const authtoken = jwt.sign(
                { userId: user._id, email: user.email },
                ACCESS_TOKEN_SECRET,
                { expiresIn: "2h" }
            );
            return res.json({ authtoken });
        }

        res.status(403).json({ message: "Password is incorrect!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred during login.", error });
    }
};


export function checkAuth(req: Request, res: Response, next: NextFunction) {
    const authtoken = req.headers["authtoken"];
  
    console.log({ authtoken });
  
    if (!authtoken) {
      return res.sendStatus(403);
    }
  
    if (!jwt.verify(authtoken + "", ACCESS_TOKEN_SECRET)) {
      return res.sendStatus(403);
    }
    next();
  }


export const generateOtp = async ( req:Request, res: Response) => {
    const { email } = req.body;

    const otp = Math.floor(Math.random() * 8999) + 1000;

    try{
        await OtpModel.create({email, otp});

        const transporter = nodemailer.createTransport({
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
        })
        res.status(200).send('OTP sent successfully')
    }
    catch(error){
        console.error(error)
        res.status(400).send('OTP send failed.')
    }
}

export const verifyOtp = async ( req:Request, res: Response) => { 
    const { email, otp } = req.body

    try{
        const otpRecord = await OtpModel.findOne({ email, otp}).exec()

        if(otpRecord){
            res.status(200).send('OTP verified successfully')
        }else{
            res.status(400).send('Invalid OTP')
        }
    }catch(error){
        console.error(error)
        res.status(500).send('Error verifying OTP')
    }
    
}