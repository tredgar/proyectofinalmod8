const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    precio: { type: Number, required: true, min: 0 },
    descripcionCorta: {
      type: String,
      required: true,
      maxlength: [200, "La descripción corta no puede exceder 200 caracteres"],
      trim: true,
    },
    descripcion: {
      type: String,
      required: true,
      trim: true,
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, "El stock no puede ser negativo"],
    },
    imagenUrl: {
      type: String,
      default: "",
    },
    // Apunta a la categoría o subcategoría directa
    categoria: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categoria",
      required: [true, "La categoría del producto es obligatoria"],
    },
    // Aqui se almacenan pares dinámicos clave-valor: { "Talla": "M", "Color": "Negro" } para cada tipo de producto
    especificaciones: {
      type: Map,
      of: String,
    },
    activo: {
      type: Boolean,
      default: true
    }
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
