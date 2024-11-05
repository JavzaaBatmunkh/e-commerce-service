import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

export const handleUpload= async (file: string)=> {
    const result=await cloudinary.uploader.upload(file,{resource_type: 'auto'});
    return result.secure_url;
}