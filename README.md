# 🏨 Culmen Hotel & SPA

## 📋 Descripción

**Culmen Hotel & SPA** es un proyecto desarrollado como parte del curso **Back End I**, cuyo objetivo principal es poner en práctica los conocimientos adquiridos durante la cursada.

El proyecto consiste en desarrollar un sistema backend para la gestión de **turnos y reservas de servicios de un hotel SPA**.

La aplicación permite gestionar los diferentes servicios ofrecidos por el hotel, así como también administrar los turnos y reservas realizados por los clientes.

## 🎯 Objetivos del proyecto

El objetivo principal es aplicar los conceptos y herramientas aprendidos durante el curso de **Back End I**, desarrollando una API que permita gestionar los recursos principales del sistema.

Entre las funcionalidades principales se encuentran:

- 📅 Crear y gestionar turnos.
- 🏨 Realizar reservas de servicios.
- ➕ Crear nuevos servicios.
- ✏️ Actualizar servicios existentes.
- 🗑️ Eliminar servicios.
- 🔎 Consultar los servicios disponibles.
- 📋 Gestionar la información relacionada con las reservas.

## 🛠️ Tecnologías utilizadas

- Node.js
- Express
- JavaScript
- dotenv
- REST API

## 📚 Conceptos aplicados

Durante el desarrollo del proyecto se ponen en práctica diferentes conceptos relacionados con el desarrollo backend, entre ellos:

- Arquitectura en capas.
- Controllers.
- Services.
- DAOs / Repositories.
- Rutas y endpoints.
- Middleware.
- Variables de entorno.
- Manejo de errores.
- Operaciones CRUD.
- Arquitectura RESTful.
- Se agregaran mas de ser necesario.

## 🏨 Sobre Culmen Hotel & SPA

**Culmen Hotel & SPA** busca representar un sistema de gestión para un hotel que ofrece diferentes servicios de bienestar y relajación.

El sistema permite administrar los servicios disponibles y gestionar las reservas y turnos de los clientes de manera organizada.

---

```text
Back-End-Turno-Y-Reservas/
│
├── src/
│   │
│   ├── config/
│   │   └── env.config.js
│   │
│   ├── controllers/
│   │
│   ├── dao/
│   │
│   ├── data/
│   │   └── services.json
│   │
│   ├── managers/
│   │   └── ServiceManager.js
│   │
│   ├── middlewares/
│   │
│   ├── models/
│   │
│   ├── repositories/
│   │
│   ├── routes/
│   │
│   ├── services/
│   │
│   ├── utils/
│   │
│   ├── app.js
│   └── server.js
│
├── README.md
├── .env
├── .env.example
├── .gitignore
├── package.json
└── package-lock.json
```

## ⚙️ Instalación

Para ejecutar el proyecto localmente, seguí los siguientes pasos.

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

## 🔐 Variables de entorno

El proyecto utiliza variables de entorno para configurar el puerto del servidor y el modo de ejecución.

En la raíz del proyecto, crear un archivo llamado `.env`:

```env
PORT=8080
NODE_ENV=development
```

### Variables disponibles

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `PORT` | Puerto donde se ejecuta el servidor | `8080` |
| `NODE_ENV` | Entorno de ejecución de la aplicación | `development` |

> ⚠️ El archivo `.env` no debe subirse al repositorio. Utilizá `.env.example` como referencia para configurar las variables necesarias.

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

| Comando | Descripción |
|---------|-------------|
| `npm run start` | Inicia el servidor |
| `npm run dev` | Inicia el servidor en modo desarrollo con reinicio automático |
| `npm run test` | Comando de pruebas actualmente no configurado |

## 🌐 Servidor local

Una vez iniciado el proyecto, el servidor se ejecutará en el puerto configurado en el archivo `.env`.

Por defecto:

```text
http://localhost:8080
```

## 👨‍💻 Autor

**Julian Jara Aguirre**

Proyecto realizado con fines educativos como parte del curso **Back End 1**.