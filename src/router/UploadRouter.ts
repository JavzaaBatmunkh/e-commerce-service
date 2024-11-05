import express from 'express'
import Multer, {memoryStorage} from "multer"
import { uploader } from '../controller/UploadController';

const uploadRouter=express.Router();
const storage= memoryStorage()
const multer=Multer({storage})

uploadRouter.post('/upload', multer.array("image"), uploader)

export {uploadRouter}
