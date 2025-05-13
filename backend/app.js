import express from "express"
import cookieParser from "cookie-parser";

//routes
import registerClientsRoute from "./src/routes/registerClientsRoute.js"



const app = express();

app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/registerClients", registerClientsRoute);

export default app;