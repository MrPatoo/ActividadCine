import mongoose from "mongoose";
import { config } from "./src/config.js";


mongoose.connect(config.db.URI);

//conectada
const connection = mongoose.connection;
connection.once("open", ()=> {
    console.log("DB is connected");
});
//desconectada
connection.on("disconnected", ()=>{
    console.log("DB is disconnected");
});
//error
connection.on("error", (error)=>{
    console.log("error found: " + error);
});
