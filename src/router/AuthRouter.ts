import express , {Router} from "express";
import { checkAuth, generateOtp, login, register, verifyOtp } from "../controller/AuthController";
import { getUser } from "../controller/UserController";

export const authRouter = express.Router()

authRouter
.post('/login', login)
.post('/register', register)
.get('/auth', checkAuth, getUser)
.post('/generate', generateOtp)
.post('/verify', verifyOtp)