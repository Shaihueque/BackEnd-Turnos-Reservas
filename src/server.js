import { app } from './app.js';
import { config } from './config/env.js';

app.listen(config.port, () => {
  console.log(`Servidor corriendo en modo ${config.nodeEnv} en el puerto ${config.port}`);
});

console.log('Aplicación inicializada');
 console.log(app);