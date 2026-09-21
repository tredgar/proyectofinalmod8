const validarSchema = (schema) => (req, res, next) => {
  try {
    // Si la validación pasa, reemplaza req.body/params con los datos Parseados y Transformados por Zod
    const datosValidados = schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (datosValidados.body) req.body = datosValidados.body;
    if (datosValidados.query) req.query = datosValidados.query;
    if (datosValidados.params) req.params = datosValidados.params;

    next();
  } catch (error) {
    if (error.name === "ZodError") {
      const fieldErrors = error.flatten().fieldErrors;
      const formattedErrors = {};

      Object.keys(fieldErrors).forEach((key) => {
        const cleanKey = key.replace("body.", "");
        formattedErrors[cleanKey] = fieldErrors[key]?.[0];
      });

      return res.status(400).json({
        exito: false,
        mensaje: "Error de validación en los datos ingresados",
        errores: formattedErrors,
      });
    }

    return res.status(500).json({
      exito: false,
      mensaje: "Error interno en el servidor",
    });
  }
};

module.exports = validarSchema;
