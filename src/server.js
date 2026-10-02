import { app } from './app.js'
import { connectDB } from "./config/database.config.js"
import { config } from './config/env.config.js'

connectDB().then(() => {

    app.listen(config.port, () => {
        console.log(
            `Servidor corriendo en modo ${config.nodeEnv} en el puerto ${config.port}`
        )
    })

})

console.log('Aplicación inicializada')
console.log(app)