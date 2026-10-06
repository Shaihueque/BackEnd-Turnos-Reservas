import {createServer} from "node:http";
import {Server} from "socket.io";

import { app } from './app.js'
import { connectDB } from "./config/database.config.js"
import { config } from './config/env.config.js'

const httpServer = createServer(app)

const io = new Server(httpServer)

app.set("io", io)

io.on("connection", (socket)=>{
    console.log("Cliente conectado:", socket.id)

    socket.on("disconnect", ()=>{
        console.log("Cliente desconectado", socket.id)
    })
})

connectDB().then(() => {

    httpServer.listen(config.port, () => {
        console.log(
            `Servidor corriendo en modo ${config.nodeEnv} en el puerto ${config.port}`
        )
    })

})

console.log('Aplicación inicializada')
console.log(app)