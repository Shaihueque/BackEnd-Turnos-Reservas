# Culmen Hotel & SPA — Backend de Turnos y Reservas

Backend desarrollado con **Node.js, Express, MongoDB y Mongoose** para gestionar servicios y reservas de un establecimiento.

El proyecto implementa una arquitectura por capas y cuenta además con vistas dinámicas utilizando **Handlebars** y actualizaciones en tiempo real mediante **Socket.io**. También incorpora validaciones de datos con **Zod**, filtros, paginación y ordenamiento de servicios.

---

## 📋 Descripción

La aplicación permite:

- Gestionar servicios.
- Crear, consultar, actualizar y eliminar servicios.
- Filtrar servicios por categoría y disponibilidad.
- Paginar y ordenar los resultados de servicios.
- Crear, consultar, actualizar y eliminar reservas.
- Asociar servicios a una reserva.
- Incrementar la cantidad de un mismo servicio dentro de una reserva.
- Validar los datos recibidos mediante Zod.
- Consultar información mediante una API REST.
- Visualizar servicios y reservas mediante vistas Handlebars.
- Actualizar las vistas automáticamente utilizando Socket.io, sin necesidad de recargar la página.
- Mantener las relaciones entre reservas y servicios mediante ObjectId y Mongoose.

---

## 🚀 Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- Zod
- Express Handlebars
- Socket.io
- JavaScript
- dotenv
- API REST
- Arquitectura por capas

---

## 📚 Conceptos aplicados

- API REST
- Operaciones CRUD
- Express Router
- Controllers
- Services
- Repositories
- DAO
- Modelos con Mongoose
- MongoDB
- Relaciones mediante ObjectId y `populate()`
- Validación de datos con Zod
- Middleware de Express
- Filtros mediante query parameters
- Paginación
- Ordenamiento
- Variables de entorno
- Handlebars
- Vistas dinámicas
- Socket.io
- Comunicación en tiempo real
- Persistencia de datos
- Arquitectura por capas

---

## 📁 Estructura del proyecto

```text
Back-End-Turno-Y-Reservas/
│
├── public/
│   └── js/
│       └── socket.js
│
├── src/
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
│   │   └── validateBody.middleware.js
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
│   ├── validations/
│   │   ├── service.validation.js
│   │   └── bookings.validation.js
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

## 🏗️ Arquitectura

El proyecto utiliza una arquitectura por capas:

```text
Routes
   ↓
Middlewares
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

### Middlewares

Procesa las solicitudes antes de que lleguen al controlador. En este proyecto se utilizan para validar los datos y los parámetros de las rutas.

### Controllers

Recibe las solicitudes, coordina la ejecución de la lógica de negocio y devuelve las respuestas HTTP.

También emite eventos mediante Socket.io cuando corresponde.

### Services

Contiene la lógica de negocio de la aplicación.

### Repositories

Actúa como intermediario entre la capa de servicios y el DAO.

### DAO

Se encarga de realizar las operaciones de acceso a datos mediante los modelos de Mongoose.

### Models

Definen los esquemas utilizados para almacenar información en MongoDB.

---

## ⚙️ Instalación

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

## 🔐 Variables de entorno

Crear un archivo `.env` en la raíz del proyecto.

Ejemplo:

```env
PORT=8080
NODE_ENV=development
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
```

También se incluye un archivo `.env.example` para mostrar las variables necesarias sin exponer información sensible.

**Importante:** el archivo `.env` no debe subirse al repositorio.

---

## ▶️ Ejecutar el proyecto

Para iniciar el servidor:

```bash
npm start
```

Para ejecutar el proyecto en modo desarrollo:

```bash
npm run dev
```

El servidor quedará disponible en:

[http://localhost:8080](http://localhost:8080)

---

## 🌐 API REST

La API permite administrar servicios y reservas mediante solicitudes HTTP.

Los ejemplos siguientes utilizan `http://localhost:8080` como dirección base.

## 🧖 Servicios

### Obtener todos los servicios

```http
GET /api/services
```

Permite obtener los servicios almacenados en MongoDB.

### Filtrar servicios

El endpoint admite los siguientes parámetros:

| Parámetro | Descripción | Ejemplo |
|---|---|---|
| `category` | Filtra por categoría | `category=salud` |
| `available` | Filtra por disponibilidad | `available=true` |
| `page` | Número de página | `page=1` |
| `limit` | Cantidad máxima de resultados por página | `limit=5` |
| `sortBy` | Campo por el que se ordenan los resultados | `sortBy=price` |
| `order` | Sentido del ordenamiento: `asc` o `desc` | `order=desc` |

Ejemplos:

**Filtrar por categoría:**

```http
GET /api/services?category=salud
```

**Filtrar por disponibilidad:**

```http
GET /api/services?available=true
```

**Obtener la primera página con cinco resultados:**

```http
GET /api/services?page=1&limit=5
```

**Ordenar por precio de mayor a menor:**

```http
GET /api/services?sortBy=price&order=desc
```

**Combinar filtros, paginación y ordenamiento:**

```http
GET /api/services?category=salud&available=false&page=1&limit=5&sortBy=price&order=desc
```

### Respuesta con paginación

La respuesta incluye los servicios encontrados y los metadatos de paginación.

```json
{
  "status": "success",
  "data": [],
  "pagination": {
    "total": 12,
    "page": 1,
    "limit": 5,
    "totalPages": 3,
    "hasPrevPage": false,
    "hasNextPage": true
  }
}
```

Los valores son ilustrativos.

- `total`: cantidad total de servicios que cumplen los filtros.
- `page`: página actual.
- `limit`: cantidad máxima de resultados por página.
- `totalPages`: cantidad total de páginas.
- `hasPrevPage`: indica si existe una página anterior.
- `hasNextPage`: indica si existe una página siguiente.

### Obtener un servicio por ID

```http
GET /api/services/:sid
```

Ejemplo:

```http
GET /api/services/6ac50dca9fc85721a2c03faf
```

### Crear un servicio

```http
POST /api/services
```

Ejemplo de body JSON:

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

La solicitud se valida mediante un esquema de Zod antes de ejecutar la lógica de creación.

### Actualizar un servicio

```http
PUT /api/services/:sid
```

Ejemplo de body JSON:

```json
{
  "name": "Gimnasio actualizado",
  "price": 12000,
  "available": false
}
```

Se permite enviar los campos que se desean modificar, siempre que se envíe al menos uno y que los valores cumplan las reglas de validación.

### Eliminar un servicio

```http
DELETE /api/services/:sid
```

El servicio se identifica mediante su ID.

---

## 📅 Reservas

### Obtener todas las reservas

```http
GET /api/bookings
```

Devuelve las reservas almacenadas en MongoDB.

### Crear una reserva

```http
POST /api/bookings
```

Ejemplo de body JSON:

```json
{
  "clientName": "Juan Perez",
  "clientEmail": "juan@email.com",
  "date": "2026-10-20",
  "time": "14:30",
  "status": "pending",
  "services": []
}
```

La solicitud se valida mediante Zod. Se verifican los datos del cliente, el correo electrónico, la fecha, la hora, el estado y la estructura de los servicios incluidos.

El estado `pending` se utiliza como valor predeterminado si el esquema no recibe uno y la configuración de Zod lo permite.

### Obtener una reserva por ID

```http
GET /api/bookings/:bid
```

Ejemplo:

```http
GET /api/bookings/6ace54933712963d59c6461d
```

La respuesta incluye los datos de la reserva y los detalles de los servicios asociados mediante `populate()`.

### Actualizar una reserva

```http
PUT /api/bookings/:bid
```

Ejemplo de body JSON:

```json
{
  "status": "confirmed"
}
```

### Eliminar una reserva

```http
DELETE /api/bookings/:bid
```

Elimina la reserva identificada por su ID.

### Agregar un servicio a una reserva

```http
POST /api/bookings/:bid/services/:sid
```

Este endpoint agrega un servicio existente a una reserva existente.

Ejemplo:

```http
POST /api/bookings/6ace54933712963d59c6461d/services/6abf20b35446d536e1c4bce4
```

No requiere body: la reserva y el servicio se identifican mediante los parámetros de la URL.

La aplicación valida el formato de ambos IDs antes de ejecutar el controlador. Luego comprueba que la reserva y el servicio existan.

Si el servicio todavía no está asociado a la reserva, se agrega con cantidad `1`. Si ya está asociado, se incrementa su cantidad.

Ejemplo conceptual de una relación:

```json
{
  "service": "6abf20b35446d536e1c4bce4",
  "quantity": 2
}
```

La respuesta de la API puede mostrar el servicio poblado con sus datos completos.

---

## ✅ Validación de datos con Zod

El proyecto utiliza **Zod** para validar los datos recibidos por determinados endpoints antes de ejecutar las operaciones de negocio.

Los esquemas se encuentran en:

```text
src/validations/
├── service.validation.js
└── bookings.validation.js
```

El middleware de validación se encuentra en:

```text
src/middlewares/validateBody.middleware.js
```

### Operaciones validadas

- Creación de servicios.
- Actualización de servicios.
- Creación de reservas.
- Parámetros de la ruta para agregar servicios a una reserva.

### Validación de servicios

Al crear o actualizar un servicio se validan campos como:

- Nombre.
- Descripción.
- Duración.
- Precio.
- Categoría.
- Disponibilidad.

Los campos deben respetar los tipos y las restricciones definidas en los esquemas.

### Validación de reservas

Al crear una reserva se validan campos como:

- Nombre del cliente.
- Correo electrónico.
- Fecha.
- Hora.
- Estado.
- Estructura de los servicios incluidos.

### Validación de parámetros

Para agregar un servicio a una reserva, los parámetros `bid` y `sid` deben tener el formato de un ObjectId de MongoDB: 24 caracteres hexadecimales.

La validación del formato no garantiza que el documento exista. La existencia de la reserva y del servicio se comprueba durante la ejecución de la operación.

### Respuesta ante errores de validación

Cuando los datos no cumplen el esquema, la API devuelve `400 Bad Request` y una lista de errores.

Ejemplo ilustrativo:

```json
{
  "status": "error",
  "message": "Error de validación",
  "errors": [
    {
      "field": "clientEmail",
      "message": "Debés ingresar un correo electrónico válido"
    }
  ]
}
```

Los mensajes concretos dependen del esquema y del campo que no supere la validación.

---

## 🔗 Relación entre reservas y servicios

Las reservas almacenan referencias a los servicios mediante ObjectId de MongoDB.

El modelo de reserva utiliza una estructura similar a la siguiente:

```js
services: [
  {
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      default: 1
    }
  }
]
```

Esto permite asociar servicios a una reserva sin duplicar toda la información del servicio dentro del documento de reserva.

### Uso de populate()

Para consultar los detalles completos de los servicios asociados se utiliza:

```js
.populate("services.service")
```

De esta manera, la respuesta puede incluir el nombre, la descripción, la duración, el precio, la categoría y la disponibilidad de cada servicio.

Ejemplo ilustrativo de respuesta:

```json
{
  "status": "success",
  "data": {
    "_id": "6ace54933712963d59c6461d",
    "clientName": "Juan Perez",
    "clientEmail": "juan@email.com",
    "date": "2026-10-20",
    "time": "14:30",
    "status": "pending",
    "services": [
      {
        "service": {
          "_id": "6abf20b35446d536e1c4bce4",
          "name": "Masajes",
          "description": "Masaje descontracturante",
          "duration": 45,
          "price": 15000,
          "category": "relajacion",
          "available": true
        },
        "quantity": 1
      }
    ]
  }
}
```

---

## 🖥️ Vistas con Handlebars

El proyecto utiliza **Express Handlebars** como motor de vistas.

La configuración se encuentra en:

```text
src/app.js
```

Las vistas se encuentran en:

```text
src/views/
```

### Vista de servicios

Ruta:

```http
GET /views/services
```

URL:

[http://localhost:8080/views/services](http://localhost:8080/views/services)

La vista obtiene los servicios desde MongoDB utilizando la arquitectura del proyecto.

La información mostrada incluye:

- Nombre.
- Descripción.
- Duración.
- Precio.
- Categoría.
- Disponibilidad.

Los datos se obtienen de la base de datos y no se encuentran hardcodeados en el archivo Handlebars.

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

No existen datos de servicios hardcodeados dentro del archivo `.handlebars`.

### Vista individual de servicio

Ruta:

```http
GET /views/services/:sid
```

Ejemplo:

[http://localhost:8080/views/services/ID_DEL_SERVICIO](http://localhost:8080/views/services/ID_DEL_SERVICIO)

### Vista de disponibilidad

Ruta:

```http
GET /views/availability
```

URL:

[http://localhost:8080/views/availability](http://localhost:8080/views/availability)

La vista obtiene las reservas reales desde MongoDB.

Muestra información como:

- Cliente.
- Email.
- Fecha.
- Hora.
- Estado.
- Servicios asociados.
- Cantidad de cada servicio.

Los servicios asociados a una reserva se obtienen mediante `populate()` de Mongoose.

### Vista individual de reserva

Ruta:

```http
GET /views/availability/:bid
```

Ejemplo:

[http://localhost:8080/views/availability/ID_DE_LA_RESERVA](http://localhost:8080/views/availability/ID_DE_LA_RESERVA)

---

## ⚡ Socket.io

El proyecto utiliza **Socket.io** para realizar actualizaciones en tiempo real.

El servidor Socket.io se configura en:

```text
src/server.js
```

El cliente se encuentra en:

```text
public/js/socket.js
```

La conexión del cliente se realiza mediante:

```js
const socket = io();
```

Cuando el navegador establece la conexión, se muestra el mensaje correspondiente en la consola del navegador.

---

## 🔄 Eventos en tiempo real

Los eventos utilizados por la aplicación incluyen:

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

Las vistas reciben estos eventos para reflejar los cambios realizados mediante la API sin necesidad de recargar manualmente la página.

---

## 🔄 Actualización dinámica

Por ejemplo, al crear un servicio mediante:

```http
POST /api/services
```

el servidor puede emitir el evento:

```js
io.emit("serviceCreated", newService);
```

El cliente puede escuchar el evento:

```js
socket.on("serviceCreated", (service) => {
  // Actualiza la vista con el nuevo servicio.
});
```

El mismo principio se aplica a la actualización y eliminación de servicios, así como a las operaciones sobre reservas.

---

## ✏️ Actualización de servicios en tiempo real

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

## 🗑️ Eliminación de servicios en tiempo real

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

## 📅 Reservas en tiempo real

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

## 🧪 Verificación de Socket.io

Para comprobar el funcionamiento:

1. Abrir la vista de servicios en [http://localhost:8080/views/services](http://localhost:8080/views/services).
2. Crear un servicio mediante `POST /api/services`.
3. Comprobar que el nuevo servicio aparece en la vista sin recargar la página.
4. Actualizar un servicio mediante `PUT /api/services/:sid`.
5. Verificar que los cambios se reflejen automáticamente.
6. Eliminar un servicio mediante `DELETE /api/services/:sid`.
7. Comprobar que desaparezca de la vista.
8. Repetir el procedimiento con las reservas en [http://localhost:8080/views/availability](http://localhost:8080/views/availability).

Las actualizaciones dependen de que el cliente esté conectado y de que los eventos correspondientes estén correctamente implementados en el servidor y en las vistas.

---

## 🧪 Pruebas manuales de la API

Las solicitudes pueden probarse mediante Postman o Thunder Client.

### Servicios

- `GET /api/services`: obtener servicios.
- `GET /api/services?category=salud`: filtrar por categoría.
- `GET /api/services?page=1&limit=5`: comprobar paginación.
- `GET /api/services?sortBy=price&order=desc`: comprobar ordenamiento.
- `POST /api/services`: crear un servicio con datos válidos.
- `POST /api/services`: comprobar que los datos inválidos devuelvan `400`.
- `PUT /api/services/:sid`: actualizar un servicio.
- `PUT /api/services/:sid`: comprobar que no se acepte una actualización vacía.
- `DELETE /api/services/:sid`: eliminar un servicio.

### Reservas

- `POST /api/bookings`: crear una reserva con datos válidos.
- `POST /api/bookings`: comprobar la validación de los datos.
- `GET /api/bookings/:bid`: consultar una reserva y sus servicios poblados.
- `POST /api/bookings/:bid/services/:sid`: agregar un servicio.
- `POST /api/bookings/123/services/456`: comprobar que los parámetros inválidos devuelvan `400`.
- Agregar un ID con formato válido pero inexistente para comprobar la respuesta `404`.
- Agregar dos veces el mismo servicio y comprobar que la cantidad aumente.
- `PUT /api/bookings/:bid`: actualizar una reserva.
- `DELETE /api/bookings/:bid`: eliminar una reserva.

---

## 💾 Persistencia

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
mongoose.Schema.Types.ObjectId
```

y la referencia:

```js
ref: "Service"
```

Para recuperar los datos completos de los servicios asociados se utiliza:

```js
.populate("services.service")
```

La información persiste en MongoDB entre reinicios del servidor.

---

## 🔒 Seguridad

Las credenciales de MongoDB se almacenan mediante variables de entorno.

El archivo `.env` debe estar incluido en `.gitignore` y no debe subirse al repositorio.

El archivo `.env.example` contiene la estructura necesaria para configurar el proyecto sin exponer credenciales reales.

---

## 📦 Scripts disponibles

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

## 👨‍💻 Autor

**Julian Jara Aguirre**
