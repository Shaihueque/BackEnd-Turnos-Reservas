import dotenv from 'dotenv';

dotenv.config();

if (!process.env.PORT) {
  throw new Error('Falta la variable de entorno PORT');
}

if (!process.env.NODE_ENV) {
  throw new Error('Falta la variable de entorno NODE_ENV');
}

export const config = {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV
};