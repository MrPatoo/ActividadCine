import express from "express"
import cookieParser from "cookie-parser";

//routes
import registerClientsRoute from "./src/routes/registerClientsRoute.js"
import registerEmployeesRoute from "./src/routes/registerEmployeesRoute.js"
import loginRoute from "./src/routes/loginRoute.js"
import passwordRecoveryRoute from "./src/routes/passwordRecoveryRoute.js";



const app = express();

app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/registerClients", registerClientsRoute);
app.use("/api/registerEmployees", registerEmployeesRoute);
app.use("/api/login", loginRoute);
app.use("/api/passwordRecovery", passwordRecoveryRoute);

export default app;