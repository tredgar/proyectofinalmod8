const { z } = require("zod");

// Helper para Title Case ("tecnologia y computo" -> "Tecnologia Y Computo")
const titleCase = (str) => {
  if (!str) return str;
  return str
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const categoriaSchema = z.object({
  body: z.object({
    nombre: z
      .string({ required_error: "El nombre de la categoría es obligatorio" })
      .trim()
      .min(2, "El nombre debe tener al menos 2 caracteres")
      .transform(titleCase),

    descripcion: z.string().trim().optional(),

    camposPersonalizados: z.array(z.string().trim()).optional().default([]),

    estado: z.boolean().optional().default(true),
  }),
});

module.exports = {
  categoriaSchema,
};
