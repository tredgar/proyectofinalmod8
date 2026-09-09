const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    precio: { type: Number, required: true, min: 0 },
    descripcionCorta: {
      type: String,
      required: true,
      maxlength: [150, "La descripción corta no puede exceder 150 caracteres"],
      trim: true,
    },
    descripcion: {
      type: String,
      required: true,
      trim: true,
    },
    // Apunta a la categoría o subcategoría directa
    categoria: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categoria",
      required: true,
    },
    // Aqui se almacenan pares dinámicos clave-valor: { "Talla": "M", "Color": "Negro" } para cada tipo de producto
    especificaciones: {
      type: Map,
      of: String,
    },
  },
  { timestamps: true },
);

productoSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("Producto", productoSchema);
