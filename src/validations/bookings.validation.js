import { z } from "zod";

export const createBookingSchema = z.object({
    clientName: z.string()
        .trim()
        .min(3, "El nombre del cliente debe tener al menos 3 caracteres"),

    clientEmail: z.string()
        .trim()
        .email("Debés ingresar un correo electrónico válido"),

    date: z.string()
        .min(1, "La fecha es obligatoria")
        .refine(value => !Number.isNaN(Date.parse(value)), {
            message: "La fecha no es válida"
        }),

    time: z.string()
        .regex(
            /^([01]\d|2[0-3]):[0-5]\d$/,
            "La hora debe tener el formato HH:mm"
        ),

    status: z.enum(["pending", "confirmed", "cancelled"])
        .default("pending"),

    services: z.array(
        z.object({
            service: z.string()
                .regex(/^[0-9a-fA-F]{24}$/, "El ID del servicio no es válido"),

            quantity: z.number()
                .int("La cantidad debe ser un número entero")
                .positive("La cantidad debe ser mayor que cero")
                .default(1)
        })
    ).default([])
});

export const addServiceToBookingParamsSchema = z.object({
    bid: z.string().regex(
        /^[0-9a-fA-F]{24}$/,
        "El ID de la reserva no es válido"
    ),
    sid: z.string().regex(
        /^[0-9a-fA-F]{24}$/,
        "El ID del servicio no es válido"
    )
});