import express from "express"
import cookieParser from "cookie-parser";

//routes
import registerClientsRoute from "./src/routes/registerClientsRoute.js"
import registerEmployeesRoute from "./src/routes/registerEmployeesRoute.js"
import loginRoute from "./src/routes/loginRoute.js"
import logoutRoute from "./src/routes/logoutRoute.js"
import passwordRecoveryRoute from "./src/routes/passwordRecoveryRoute.js";
import moviesRoute from "./src/routes/MoviesRoute.js"

const app = express();

app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/registerClients", registerClientsRoute);
app.use("/api/registerEmployees", registerEmployeesRoute);
app.use("/api/login", loginRoute);
app.use("/api/logout", logoutRoute);
app.use("/api/passwordRecovery", passwordRecoveryRoute);
app.use("/api/movies", moviesRoute);

export default app;