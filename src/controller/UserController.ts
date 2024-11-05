import { Request, Response, } from "express";
import { UserModel } from "../model/UserModel";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import "dotenv/config"


// export const getUsers = async (req: Request, res: Response) => {
//     const authtoken = req.headers["authtoken"];
    
//     const data = jwt.decode(authtoken + "")
    

//     try {
//         const users = await UserModel.find()
//         res.send(users)
//     }
//     catch (error) {
//         res.status(400).json({ errorMessage: "Error" })
//     }
// }
export const getUser = async (req: Request, res: Response) => {
    const authtoken = req.headers["authtoken"];
    if (!authtoken) {
        return res.status(401).json({ errorMessage: "No token provided" });
    }

    const data = jwt.decode(authtoken as string);

    if (typeof data !== 'object' || data === null || !('userId' in data)) {
        return res.status(401).json({ errorMessage: "Invalid token" });
    }

    try {
        const user = await UserModel.findById(data.userId);
        if (!user) {
            return res.status(404).json({ errorMessage: "User not found" });
        }
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            address: user.address,
        });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ errorMessage: "Error retrieving user" });
    }
};

export const createUsers = async (req: Request, res: Response) => {
    try {
        const { name, email, password, phoneNumber, address } = req.body
        const user = await UserModel.create({ name, email, password, phoneNumber, address })
        res.send(user)
    }
    catch (error) {
        res.status(400).json({ errorMessage: "Create doesn't working!" })
    }
}


export const confirmMethod = async (req: Request, res: Response) => {
    try {
        const { password } = req.body;
        const _id = req.headers['userid']; // Retrieve user ID from headers

        if (!password || !_id) {
            return res.status(400).json({ message: "Password and User ID are required!" });
        }

        const user = await UserModel.findOne({ _id });
        if (!user) {
            return res.status(401).json({ message: "User not found!" });
        }
        
        const isEqual = await bcrypt.compare(password, user.password);
        console.log(isEqual)
        if (!isEqual) {
            return res.status(401).json({ message: "Invalid password!" });
        }
        return res.status(200).json({ message: "Password confirmed!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error"});
    }
};



export const updateUsers = async (req: Request, res: Response) => {
    try {
        const { name, email, password, phoneNumber, address } = req.body;

        const { id } = req.params;
        const hashedPassword = await bcrypt.hash(String(password), Number(process.env.SALT_SECRET))
        const update = await UserModel.findByIdAndUpdate(id, { name, email, password: hashedPassword, phoneNumber, address })
        res.send(update)
    }
    catch (error) {
        res.status(400).json({ errorMessage: "Edit doesn't working!" })
    }
}



export const deleteUsers = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await UserModel.deleteOne({ _id: id })
        res.send({ message: "Successfully deleted!" })
    }
    catch (error) {
        res.status(400).json({ errorMessage: "Edit doesn't working!" })
    }
}