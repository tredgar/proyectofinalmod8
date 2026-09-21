const buildSchema=(z)=>{
    z.object({
      name:
        z.string()
        .min(3, {message: "El nombre de usuario debe tener al menos 3 caracteres"})
        .required({ message: "El nombre es obligatorio" }),
      email: z.string().email({ message: "El correo no es válido" }).required({ message: "El correo es obligatorio" }),
      password: 
        z.string()
        .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
        .required({ message: "La contraseña es obligatoria" }),
    });
}
export  {buildSchema};