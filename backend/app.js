import express from "express"
import cookieParser from "cookie-parser";

//routes
import registerClientsRoute from "./src/routes/registerClientsRoute.js"
import registerEmployeesRoute from "./src/routes/registerEmployeesRoute.js"



const app = express();

app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/registerClients", registerClientsRoute);
app.use("/api/registerEmployees", registerEmployeesRoute);

export default app;