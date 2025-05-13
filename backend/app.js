import express from "express"
import cookieParser from "cookie-parser";

//routes



const app = express();

app.use(express.json());
app.use(cookieParser());

export default app;