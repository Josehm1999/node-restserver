import dotenv from "dotenv";

import Server from "./models/server"

//Configuración .env
dotenv.config();
const server = new Server();

server.listen();


