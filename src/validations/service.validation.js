import { z } from "zod";

export const createServiceSchema = z.object({
    name: z.string().trim().min(4, "El nombre es obligatorio y mas de  4 caracteres"),

    description: z.string().trim().min(10, "La descripción es obligatoria y mas de 10 caracteres"),

    duration: z.coerce.number()
        .positive("La duración debe ser mayor que cero"),

    price: z.coerce.number()
        .positive("El precio debe ser mayor que cero"),

    category: z.string().trim().min(1, "La categoría es obligatoria"),

    available: z.boolean()
});

export const updateServiceSchema = createServiceSchema
    .partial() //Me permite actualizar un solo campo, sin exigir que mandes todos los datos del servicio.
    //.refine() Me impide enviar un objeto vacio
    .refine(
        data => Object.keys(data).length > 0,
        {
            message: "Debés enviar al menos un campo para actualizar"
        }
    );