import express from 'express';
import { connect } from '../src/config/mongodb';
import { userRouter } from '../src/router/UserRouter';
import { authRouter } from '../src/router/AuthRouter';
import { productRouter } from '../src/router/ProductRouter';
import { uploadRouter } from '../src/router/UploadRouter';
import { categoryRouter } from '../src/router/CategoryRouter';
import cors from 'cors';


const app = express();
const port = 4000;
connect()
app.use(express.json())
app.use(cors());
app.get("/", (req, res) => res.send("Express on Vercel"));

app.use(userRouter)
app.use(authRouter)
app.use(productRouter)
app.use(uploadRouter)
app.use(categoryRouter
)


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});