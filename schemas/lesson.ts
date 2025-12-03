import { z } from 'zod';

// Schema para las opciones (a, b, c...)
export const lessonOptionSchema = z.object({
  id: z.string().min(1, { message: "El ID de la opción es requerido" }),
  text: z.string().min(1, { message: "El texto de la opción no puede estar vacío" }),
});

// Schema para el contenido del bloque
export const lessonBlockPayloadSchema = z.object({
  prompt: z.string().min(1, { message: "La pregunta no puede estar vacía" }),
  options: z.array(lessonOptionSchema)
    .min(2, { message: "Debe haber al menos 2 opciones" })
    .max(6, { message: "No puede haber más de 6 opciones" }),
  correctOptionId: z.string().min(1, { message: "Debe especificar la opción correcta" }),
  explanation: z.string().optional(), 
});

// Schema para el bloque completo
export const lessonBlockSchema = z.object({
  type: z.literal('multiple_choice'),
  payload: lessonBlockPayloadSchema,
});

// Schema principal para crear la lección
export const createLessonSchema = z.object({
  title: z.string()
    .min(1, { message: "El título es requerido" })
    .max(200, { message: "El título es muy largo" }),

  order: z.number()
    .int()
    .min(0, { message: "El orden debe ser positivo" }),

  prerequisites: z.array(z.string()).default([]),

  contentBlocks: z.array(lessonBlockSchema)
    .min(1, { message: "Agrega al menos una pregunta" }),

  coins: z.number()
    .int()
    .min(0)
    .max(1000)
    .default(0),
});