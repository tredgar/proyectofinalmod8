const { z } = require("zod");

// Helper para Title Case
const titleCase = (str) => {
  if (!str) return str;
  return str
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const crearProductoSchema = z.object({
  body: z.object({
    nombre: z
      .string({ required_error: "El nombre del producto es obligatorio" })
      .trim()
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .transform(titleCase),

    precio: z
      .number({ required_error: "El precio es obligatorio" })
      .min(0, "El precio no puede ser negativo"),

    descripcionCorta: z
      .string({ required_error: "La descripción corta es obligatoria" })
      .trim()
      .max(200, "La descripción corta no puede exceder 200 caracteres"),

    descripcion: z
      .string({ required_error: "La descripción es obligatoria" })
      .trim(),

    stock: z
      .number()
      .min(0, "El stock no puede ser negativo")
      .optional()
      .default(0),

    imagenUrl: z.string().trim().optional().default(""),

    // Validamos que sea un ObjectId de MongoDB (string de 24 caracteres hexa)
    categoria: z
      .string({ required_error: "La categoría es obligatoria" })
      .length(24, "La categoría debe ser un ID válido de MongoDB"),

    especificaciones: z.record(z.string(), z.string()).optional(),

    activo: z.boolean().optional().default(true),
  }),
});

module.exports = {
  crearProductoSchema,
};
