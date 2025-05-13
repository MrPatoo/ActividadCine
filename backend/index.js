//importo el archivo app.js
import app from "./app.js"
//importo el archivo de conexión de la BD
import "./database.js"
//importo el archivo config
import { config } from "./src/config.js";

//creo una función que ejecuta el servidor
async function main() {
    //esta dirección esta en el archivo config
    app.listen(config.server.port);
    console.log("server running" + config.server.port);
}

//ejecuto la función
main();