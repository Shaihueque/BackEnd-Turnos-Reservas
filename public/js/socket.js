const socket = io()

socket.on("connect", () => {
    console.log("Conectado a Socket.io:", socket.id)
})

function renderBooking(booking) {

    const servicesHTML = booking.services?.length
        ? booking.services.map(item => `
            <li>
                ${item.service?.name ?? "Servicio"} × ${item.quantity}
            </li>
        `).join("")
        : "<li>No hay servicios asignados.</li>"

    return `
        <h2>Reserva</h2>

        <p>
            <strong>Cliente:</strong>
            ${booking.clientName}
        </p>

        <p>
            <strong>Email:</strong>
            ${booking.clientEmail}
        </p>

        <p>
            <strong>Fecha:</strong>
            ${booking.date}
        </p>

        <p>
            <strong>Hora:</strong>
            ${booking.time}
        </p>

        <p>
            <strong>Estado:</strong>
            ${booking.status}
        </p>

        <p>
            <strong>Servicios:</strong>
        </p>

        <ul>
            ${servicesHTML}
        </ul>

        <hr>
    `
}

//Crea servicio
socket.on("serviceCreated", (service) => {

    const servicesList = document.getElementById("services-list")

    if (!servicesList) return

    const article = document.createElement("article")
    article.dataset.serviceId = service._id

    article.innerHTML = `
        <h2>${service.name}</h2>

        <p>${service.description}</p>

        <p>
            <strong>Duración:</strong>
            ${service.duration} minutos
        </p>

        <p>
            <strong>Precio:</strong>
            $${service.price}
        </p>

        <p>
            <strong>Categoría:</strong>
            ${service.category}
        </p>

        <p>
            <strong>Disponibilidad:</strong>
            ${service.available ? "Disponible" : "No disponible"}
        </p>

        <hr>
    `

    servicesList.appendChild(article)
})

// Actualiza servicio
socket.on("serviceUpdated", (service) => {

    const article = document.querySelector(
        `[data-service-id="${service._id}"]`
    )

    if (!article) return

    article.innerHTML = `
        <h2>${service.name}</h2>

        <p>${service.description}</p>

        <p>
            <strong>Duración:</strong>
            ${service.duration} minutos
        </p>

        <p>
            <strong>Precio:</strong>
            $${service.price}
        </p>

        <p>
            <strong>Categoría:</strong>
            ${service.category}
        </p>

        <p>
            <strong>Disponibilidad:</strong>
            ${service.available ? "Disponible" : "No disponible"}
        </p>

        <hr>
    `
})


//Elimina servicio
socket.on("serviceDeleted", (serviceId) => {

    const article = document.querySelector(
        `[data-service-id="${serviceId}"]`
    )

    if (!article) return

    article.remove()
})

//Crea reserva
socket.on("bookingCreated", (booking) => {

    const bookingsList = document.getElementById("bookings-list")

    if (!bookingsList) return

    const article = document.createElement("article")

    article.dataset.bookingId = booking._id

    article.innerHTML = `
        <h2>Reserva</h2>

        <p>
            <strong>Cliente:</strong>
            ${booking.clientName}
        </p>

        <p>
            <strong>Email:</strong>
            ${booking.clientEmail}
        </p>

        <p>
            <strong>Fecha:</strong>
            ${booking.date}
        </p>

        <p>
            <strong>Hora:</strong>
            ${booking.time}
        </p>

        <p>
            <strong>Estado:</strong>
            ${booking.status}
        </p>

        <hr>
    `

    bookingsList.appendChild(article)
})

//actualizar reserva
socket.on("bookingUpdated", (booking) => {

    const article = document.querySelector(
        `[data-booking-id="${booking._id}"]`
    )

    if (!article) return

    article.innerHTML = renderBooking(booking)
})

//Delete reserva
socket.on("bookingDeleted", (bookingId) => {

    const article = document.querySelector(
        `[data-booking-id="${bookingId}"]`
    )

    if (!article) return

    article.remove()
})

//Agregamos servicio a una reserva
socket.on("bookingServiceAdded", (booking) => {

    const article = document.querySelector(
        `[data-booking-id="${booking._id}"]`
    )

    if (!article) return

    const servicesHTML = booking.services
        .map(item => `
            <li>
                ${item.service.name} × ${item.quantity}
            </li>
        `)
        .join("")

    article.innerHTML = `
        <h2>Reserva</h2>

        <p>
            <strong>Cliente:</strong>
            ${booking.clientName}
        </p>

        <p>
            <strong>Email:</strong>
            ${booking.clientEmail}
        </p>

        <p>
            <strong>Fecha:</strong>
            ${booking.date}
        </p>

        <p>
            <strong>Hora:</strong>
            ${booking.time}
        </p>

        <p>
            <strong>Estado:</strong>
            ${booking.status}
        </p>

        <p>
            <strong>Servicios:</strong>
        </p>

        <ul>
            ${servicesHTML}
        </ul>

        <hr>
    `
})