# Culmen Hotel & SPA — Backend de Turnos y Reservas

Backend desarrollado con **Node.js, Express, MongoDB y Mongoose** para gestionar servicios y reservas de un establecimiento.

El proyecto implementa una arquitectura por capas y cuenta además con vistas dinámicas utilizando **Handlebars** y actualizaciones en tiempo real mediante **Socket.io**.

---

## 📋 Descripción

La aplicación permite:

* Gestionar servicios.
* Crear, consultar, actualizar y eliminar servicios.
* Crear y consultar reservas.
* Asociar servicios a una reserva.
* Incrementar la cantidad de un mismo servicio dentro de una reserva.
* Actualizar y eliminar reservas.
* Consultar información mediante una API REST.
* Visualizar servicios y reservas mediante vistas Handlebars.
* Actualizar las vistas automáticamente utilizando Socket.io, sin necesidad de recargar la página.

---

## 🚀 Tecnologías utilizadas

* Node.js
* Express
* MongoDB
* Mongoose
* Express Handlebars
* Socket.io
* JavaScript
* dotenv
* REST API
* Arquitectura por capas

---

## 📚 Conceptos aplicados

Durante el desarrollo se trabajaron los siguientes conceptos:

* API REST
* CRUD
* Express Router
* Controllers
* Services
* Repositories
* DAO
* Models con Mongoose
* MongoDB
* Relaciones mediante `ObjectId` y `populate`
* Variables de entorno
* Handlebars
* Vistas dinámicas
* Socket.io
* Comunicación en tiempo real
* Arquitectura por capas

---

# 📁 Estructura del proyecto

```text
Back-End-Turno-Y-Reservas/
│
├── public/
│   └── js/
│       └── socket.js
│
├── src/
│   │
│   ├── config/
│   │   ├── env.config.js
│   │   └── database.config.js
│   │
│   ├── controllers/
│   │   ├── bookings.controller.js
│   │   ├── services.controller.js
│   │   └── views.controller.js
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
│   │   ├── services.models.js
│   │   ├── bookings.models.js
│   │   └── messages.models.js
│   │
│   ├── repositories/
│   │   ├── bookings.repository.js
│   │   └── services.repository.js
│   │
│   ├── routes/
│   │   ├── bookings.router.js
│   │   ├── services.router.js
│   │   └── views.router.js
│   │
│   ├── services/
│   │   ├── bookings.service.js
│   │   └── services.service.js
│   │
│   ├── utils/
│   │
│   ├── views/
│   │   ├── layouts/
│   │   │   └── main.handlebars
│   │   ├── services.handlebars
│   │   └── availability.handlebars
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

# 🏗️ Arquitectura

El proyecto utiliza una arquitectura por capas:

```text
Routes
   ↓
Controllers
   ↓
Services
   ↓
Repositories
   ↓
DAO
   ↓
Models
   ↓
MongoDB
```

Cada capa tiene una responsabilidad determinada.

### Routes

Define los endpoints disponibles y recibe las solicitudes HTTP.

### Controllers

Recibe las solicitudes de las rutas, valida los datos y devuelve las respuestas.

También se encarga de emitir eventos mediante Socket.io cuando corresponde.

### Services

Contiene la lógica de negocio de la aplicación.

### Repositories

Actúa como intermediario entre la capa de servicios y el DAO.

### DAO

Se encarga de interactuar directamente con los modelos de Mongoose.

### Models

Definen los esquemas utilizados para almacenar información en MongoDB.

---

# ⚙️ Instalación

Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
```

Ingresar al proyecto:

```bash
cd Back-End-Turno-Y-Reservas
```

Instalar las dependencias:

```bash
npm install
```

---

# 🔐 Variables de entorno

Crear un archivo `.env` en la raíz del proyecto.

Ejemplo:

```env
PORT=8080
NODE_ENV=development
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
```

También se incluye un archivo:

```text
.env.example
```

para mostrar las variables necesarias sin exponer información sensible.

> El archivo `.env` no debe subirse al repositorio.

---

# ▶️ Ejecutar el proyecto

Para iniciar el servidor:

```bash
npm start
```

Para ejecutar el proyecto en modo desarrollo:

```bash
npm run dev
```

El servidor quedará disponible en:

```text
http://localhost:8080
```

---

# 🌐 API REST

## Servicios

### Obtener todos los servicios

```http
GET /api/services
```

También permite utilizar filtros mediante query parameters:

```http
GET /api/services?category=salud
```

```http
GET /api/services?available=true
```

---

### Obtener un servicio

```http
GET /api/services/:sid
```

Ejemplo:

```http
GET /api/services/6ac50dca9fc85721a2c03faf
```

---

### Crear un servicio

```http
POST /api/services
```

Ejemplo de body:

```json
{
    "name": "Gimnasio",
    "description": "Entrenamiento personalizado",
    "duration": 60,
    "price": 10000,
    "category": "salud",
    "available": true
}
```

---

### Actualizar un servicio

```http
PUT /api/services/:sid
```

Ejemplo:

```json
{
    "name": "Gimnasio actualizado",
    "price": 12000,
    "available": false
}
```

---

### Eliminar un servicio

```http
DELETE /api/services/:sid
```

---

# 📅 Reservas

### Crear una reserva

```http
POST /api/bookings
```

Ejemplo:

```json
{
    "clientName": "Juan Perez",
    "clientEmail": "juan@email.com",
    "date": "2026-09-25",
    "time": "18:00",
    "status": "pending",
    "services": []
}
```

---

### Obtener una reserva

```http
GET /api/bookings/:bid
```

---

### Actualizar una reserva

```http
PUT /api/bookings/:bid
```

---

### Eliminar una reserva

```http
DELETE /api/bookings/:bid
```

---

### Agregar un servicio a una reserva

```http
POST /api/bookings/:bid/services/:sid
```

La aplicación verifica que tanto la reserva como el servicio existan.

Si el servicio ya está asociado a la reserva, se incrementa su cantidad.

Ejemplo:

```json
{
    "service": "6ac50dca9fc85721a2c03faf",
    "quantity": 3
}
```

---

# 🖥️ Vistas con Handlebars

El proyecto utiliza **Express Handlebars** como motor de vistas.

La configuración se encuentra en:

```text
src/app.js
```

Las vistas se encuentran en:

```text
src/views/
```

---

## 📋 Vista de servicios

Para acceder:

```text
GET /views/services
```

URL:

```text
http://localhost:8080/views/services
```

La vista obtiene los servicios directamente desde MongoDB utilizando la arquitectura del proyecto:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
DAO
    ↓
Model
    ↓
MongoDB
```

La información mostrada incluye:

* Nombre
* Descripción
* Duración
* Precio
* Categoría
* Disponibilidad

No existen datos de servicios hardcodeados dentro del archivo `.handlebars`.

---

## 🔎 Vista individual de servicio

Para consultar un servicio específico:

```text
GET /views/services/:sid
```

Ejemplo:

```text
http://localhost:8080/views/services/ID_DEL_SERVICIO
```

---

# 📅 Vista de disponibilidad

Para consultar las reservas:

```text
GET /views/availability
```

URL:

```text
http://localhost:8080/views/availability
```

La vista obtiene las reservas reales desde MongoDB.

Muestra información como:

* Cliente
* Email
* Fecha
* Hora
* Estado
* Servicios asociados
* Cantidad de cada servicio

Los servicios asociados a una reserva se obtienen mediante `populate()` de Mongoose.

---

## 🔎 Vista individual de reserva

También es posible consultar una reserva específica:

```text
GET /views/availability/:bid
```

Ejemplo:

```text
http://localhost:8080/views/availability/ID_DE_LA_RESERVA
```

---

# ⚡ Socket.io

El proyecto utiliza **Socket.io** para realizar actualizaciones en tiempo real.

El servidor Socket.io se configura en:

```text
src/server.js
```

El cliente se encuentra en:

```text
public/js/socket.js
```

La conexión se realiza mediante:

```js
const socket = io()
```

Cuando el navegador establece la conexión, se muestra:

```text
Conectado a Socket.io
```

en la consola del navegador.

---

# 🔄 Eventos en tiempo real

Actualmente se utilizan los siguientes eventos:

### Servicios

```text
serviceCreated
serviceUpdated
serviceDeleted
```

### Reservas

```text
bookingCreated
bookingUpdated
bookingDeleted
bookingServiceAdded
```

---

# 🔄 Actualización dinámica

Las vistas se actualizan automáticamente cuando ocurre una operación mediante la API.

No es necesario realizar `F5`.

Por ejemplo:

```text
POST /api/services
```

crea un nuevo servicio.

El controller emite:

```js
io.emit("serviceCreated", newService)
```

El navegador recibe el evento:

```js
socket.on("serviceCreated", (service) => {
    // Actualiza la vista
})
```

El nuevo servicio aparece automáticamente en:

```text
/views/services
```

---

# ✏️ Actualización de servicios en tiempo real

Cuando se ejecuta:

```http
PUT /api/services/:sid
```

el servidor emite:

```text
serviceUpdated
```

La vista modifica automáticamente el servicio correspondiente.

---

# 🗑️ Eliminación de servicios en tiempo real

Cuando se ejecuta:

```http
DELETE /api/services/:sid
```

el servidor emite:

```text
serviceDeleted
```

El servicio desaparece automáticamente de la vista.

---

# 📅 Reservas en tiempo real

Cuando se crea una reserva:

```text
bookingCreated
```

Cuando se actualiza:

```text
bookingUpdated
```

Cuando se elimina:

```text
bookingDeleted
```

Cuando se agrega un servicio:

```text
bookingServiceAdded
```

Las modificaciones se reflejan automáticamente en el navegador.

---

# 🧪 Verificación de Socket.io

Para comprobar el funcionamiento:

## 1. Abrir la vista

```text
http://localhost:8080/views/services
```

En otra pestaña o herramienta como Postman/Thunder Client ejecutar:

```http
POST /api/services
```

El nuevo servicio debe aparecer automáticamente en la vista.

---

## 2. Actualizar un servicio

Ejecutar:

```http
PUT /api/services/:sid
```

Modificar algún dato, por ejemplo:

```json
{
    "price": 15000
}
```

La vista debe actualizar el precio automáticamente.

No realizar `F5`.

---

## 3. Eliminar un servicio

Ejecutar:

```http
DELETE /api/services/:sid
```

El servicio debe desaparecer automáticamente de la vista.

---

## 4. Crear una reserva

Abrir:

```text
http://localhost:8080/views/availability
```

Crear una reserva utilizando:

```http
POST /api/bookings
```

La nueva reserva debe aparecer automáticamente.

---

## 5. Actualizar una reserva

Ejecutar:

```http
PUT /api/bookings/:bid
```

Por ejemplo:

```json
{
    "status": "confirmed"
}
```

El estado debe actualizarse automáticamente en el navegador.

---

## 6. Agregar un servicio

Ejecutar:

```http
POST /api/bookings/:bid/services/:sid
```

El servicio debe aparecer dentro de la reserva sin necesidad de recargar la página.

Si se vuelve a agregar el mismo servicio, la cantidad debe incrementarse.

Por ejemplo:

```text
Gimnasio × 1
```

Luego:

```text
Gimnasio × 2
```

Y nuevamente:

```text
Gimnasio × 3
```

---

# 🧩 Persistencia

La información se almacena en **MongoDB** mediante Mongoose.

Los servicios utilizan el modelo:

```text
Service
```

Las reservas utilizan:

```text
Booking
```

Las relaciones entre reservas y servicios se realizan mediante:

```js
ObjectId
```

y:

```js
ref: "Service"
```

Para obtener los datos completos del servicio asociado se utiliza:

```js
.populate("services.service")
```

---

# 🔒 Seguridad

Las credenciales de MongoDB se almacenan mediante variables de entorno.

El archivo:

```text
.env
```

se encuentra incluido en:

```text
.gitignore
```

No se deben subir credenciales reales al repositorio.

El archivo:

```text
.env.example
```

contiene únicamente la estructura necesaria para configurar el proyecto.

---

# 📦 Scripts disponibles

### Iniciar aplicación

```bash
npm start
```

### Modo desarrollo

```bash
npm run dev
```

### Tests

```bash
npm test
```

Actualmente no se encuentran configurados tests automatizados.

---

# 👨‍💻 Autor

**Julian Jara Aguirre**

---