# 🏨 Culmen Hotel & SPA

## 📋 Descripción

**Culmen Hotel & SPA** es un proyecto desarrollado como parte del curso **Back End I**, cuyo objetivo principal es poner en práctica los conocimientos adquiridos durante la cursada.

El proyecto consiste en desarrollar una API backend para la gestión de **turnos y reservas de servicios de un hotel SPA**.

La aplicación permite gestionar los diferentes servicios ofrecidos por el hotel, así como también administrar las reservas realizadas por los clientes.

La persistencia de los datos se realiza mediante **MongoDB Atlas**, utilizando **Mongoose** como herramienta de modelado y acceso a la base de datos.

## 🎯 Objetivos del proyecto

El objetivo principal es aplicar los conceptos y herramientas aprendidos durante el curso de **Back End I**, desarrollando una API que permita gestionar los recursos principales del sistema.

Entre las funcionalidades principales se encuentran:

* 📅 Crear y gestionar reservas.
* 🏨 Asociar servicios a las reservas.
* ➕ Crear nuevos servicios.
* ✏️ Actualizar servicios existentes.
* 🗑️ Eliminar servicios.
* 🔎 Consultar los servicios disponibles.

## 🛠️ Tecnologías utilizadas

* Node.js
* Express
* JavaScript
* MongoDB Atlas
* Mongoose
* dotenv
* REST API

## 📚 Conceptos aplicados

Durante el desarrollo del proyecto se ponen en práctica diferentes conceptos relacionados con el desarrollo backend, entre ellos:

* Arquitectura en capas.
* Controllers.
* Services.
* DAOs / Repositories.
* Modelos con Mongoose.
* Persistencia de datos con MongoDB Atlas.
* Relaciones entre documentos mediante ObjectId y referencias.
* Rutas y endpoints.
* Middleware.
* Variables de entorno.
* Manejo de errores.
* Operaciones CRUD.
* Arquitectura RESTful.

## 🏨 Sobre Culmen Hotel & SPA

**Culmen Hotel & SPA** busca representar un sistema de gestión para un hotel que ofrece diferentes servicios de bienestar y relajación.

El sistema permite administrar los servicios disponibles y gestionar las reservas de los clientes de manera organizada.

---

## 📁 Estructura del proyecto

```text
Back-End-Turno-Y-Reservas/
├── node_modules/
├── src/
│   ├── config/
│   │   ├── env.config.js
│   │   └── database.config.js
│   │
│   ├── controllers/
│   │   ├── bookings.controller.js
│   │   └── services.controller.js
│   │
│   ├── dao/
│   │   ├── bookings.dao.js
│   │   └── services.dao.js
│   │
│   ├── managers/
│   │
│   ├── middlewares/
│   │
│   ├── models/
│   │   ├── bookings.model.js
│   │   ├── messages.model.js
│   │   └── services.model.js
│   │
│   ├── repositories/
│   │   ├── bookings.repository.js
│   │   └── services.repository.js
│   │
│   ├── routes/
│   │   ├── bookings.router.js
│   │   └── services.router.js
│   │
│   ├── services/
│   │   ├── bookings.service.js
│   │   └── services.service.js
│   │
│   ├── utils/
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── .env.example
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

## ⚙️ Instalación

Para ejecutar el proyecto localmente, seguir los siguientes pasos.

### 1. Clonar el repositorio

```bash
git clone https://github.com/Shaihueque/BackEnd-Turnos-Reservas.git
```

### 2. Ingresar al directorio del proyecto

```bash
cd BackEnd-Turnos-Reservas
```

### 3. Instalar las dependencias

Ejecutar el siguiente comando para instalar las dependencias necesarias:

```bash
npm install
```

### 4. Configurar las variables de entorno

Crear un archivo `.env` en la raíz del proyecto utilizando `.env.example` como referencia.

Completar las variables necesarias para la configuración del servidor y la conexión con MongoDB Atlas.

> ⚠️ No subir el archivo `.env` al repositorio, ya que puede contener información sensible.

## 🔐 Variables de entorno

El proyecto utiliza variables de entorno para configurar el puerto del servidor, el modo de ejecución y la conexión con MongoDB Atlas.

En la raíz del proyecto, crear un archivo llamado `.env`:

```env
PORT=8080
NODE_ENV=development
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
```

### Variables disponibles

| Variable      | Descripción                                                  | Ejemplo                                                                |
| ------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------- |
| `PORT`        | Puerto donde se ejecuta el servidor                          | `8080`                                                                 |
| `NODE_ENV`    | Entorno de ejecución de la aplicación                        | `development`                                                          |
| `MONGODB_URI` | Cadena de conexión utilizada para conectarse a MongoDB Atlas | `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>` |

> ⚠️ El archivo `.env` no debe subirse al repositorio. Utilizar `.env.example` como referencia para configurar las variables necesarias.

## 🌐 Endpoints principales

### Servicios

| Método | Endpoint             | Descripción                 |
| ------ | -------------------- | --------------------------- |
| GET    | `/api/services`      | Obtener todos los servicios |
| GET    | `/api/services/:sid` | Obtener un servicio por ID  |
| POST   | `/api/services`      | Crear un nuevo servicio     |
| PUT    | `/api/services/:sid` | Actualizar un servicio      |
| DELETE | `/api/services/:sid` | Eliminar un servicio        |

### Reservas

| Método | Endpoint                           | Descripción                       |
| ------ | ---------------------------------- | --------------------------------- |
| GET    | `/api/bookings`                    | Obtener todas las reservas        |
| GET    | `/api/bookings/:bid`               | Obtener una reserva por ID        |
| POST   | `/api/bookings`                    | Crear una nueva reserva           |
| POST   | `/api/bookings/:bid/services/:sid` | Agregar un servicio a una reserva |
| PUT    | `/api/bookings/:bid`               | Actualizar una reserva            |
| DELETE | `/api/bookings/:bid`               | Eliminar una reserva              |

Antes de iniciar el servidor, asegurarse de haber configurado correctamente el archivo `.env` con la conexión a MongoDB Atlas.

## ▶️ Ejecución del proyecto

### Modo producción / normal

Para iniciar el servidor:

```bash
npm run start
```

Este comando ejecuta:

```bash
node src/server.js
```

### Modo desarrollo

Para ejecutar el proyecto en modo desarrollo, utilizando el reinicio automático de Node.js:

```bash
npm run dev
```

Este comando ejecuta:

```bash
node --watch src/server.js
```

## 🛠️ Scripts disponibles

| Comando         | Descripción                                                   |
| --------------- | ------------------------------------------------------------- |
| `npm run start` | Inicia el servidor                                            |
| `npm run dev`   | Inicia el servidor en modo desarrollo con reinicio automático |
| `npm run test`  | Comando de pruebas actualmente no configurado                 |

## 🌐 Servidor local

Una vez iniciado el proyecto y establecida correctamente la conexión con MongoDB Atlas, el servidor estará disponible en el puerto configurado en el archivo `.env`.

Por defecto:

```text
http://localhost:8080
```

## 👨‍💻 Autor

**Julian Jara Aguirre**

Proyecto realizado con fines educativos como parte del curso **Back End I**.
