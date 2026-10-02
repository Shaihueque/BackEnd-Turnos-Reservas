import mongoose from "mongoose"
import { config } from "./env.config.js"

//Función para conectar a MongoDB
// Esta función se llama al iniciar el servidor en server.js
export const connectDB = async () => {
    try {
        // Establecer conexión usando la URI desde las variables de entorno
        // mongoose.connect() devuelve una promesa que se resuelve cuando la conexión está lista
        await mongoose.connect(config.mongoUri)
        console.log("✅ MongoDB connected")
        
        // Manejo de eventos de conexión 
        mongoose.connection.on('error', (err) => {
            console.error('❌ Error en la conexión a MongoDB:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('⚠️ MongoDB desconectado');
        });
    } catch (error) {
        console.error("❌ MongoDB connection error:", error)
        process.exit(1) // Se  termina el proceso si falla la conexión
    }
}