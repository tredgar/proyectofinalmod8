const { z } = require("zod");

// Helper para convertir cadenas a Title Case ("erick rocha" -> "Erick Rocha")
const titleCase = (str) => {
  if (!str) return str;
  return str
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const registroUsuarioPublicoSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: "El nombre es obligatorio" })
      .trim()
      .min(2, "El nombre debe tener al menos 2 caracteres")
      .transform(titleCase), 

    lastname: z
      .string({ required_error: "El apellido es obligatorio" })
      .trim()
      .min(2, "El apellido debe tener al menos 2 caracteres")
      .transform(titleCase), 

    username: z
      .string({ required_error: "El nombre de usuario es obligatorio" })
      .trim()
      .min(3, "El username debe tener al menos 3 caracteres")
      .toLowerCase(), // cambia a minúsculas para evitar duplicados por Mayúsculas

    email: z
      .string({ required_error: "El correo electrónico es obligatorio" })
      .email("Debe ser un correo electrónico válido")
      .trim()
      .toLowerCase(), //cambia a minúsculas ("USER@MAIL.COM" -> "user@mail.com")

    password: z
      .string({ required_error: "La contraseña es obligatoria" })
      .min(8, "La contraseña debe tener al menos 8 caracteres"),

    status: z.boolean().optional().default(true),
  }),
});

module.exports = {
  registroUsuarioPublicoSchema,
};
