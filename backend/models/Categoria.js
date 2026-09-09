const mongoose= require ('mongoose');

const categoriaSchema= new mongoose.Schema(
    {
        nombre:{
            type:String,
            required:true,
            unique:true,
            trim:true
        },
        descripcion:{
            type:String,
            trim:true
        },
        estado:{
            type:Boolean,
            default:true
        }
    },
    {
        timestamps:true
    }
);
// Mapeo / Limpieza del objeto cuando se convierte a JSON para enviarlo al Frontend
categoriaSchema.set('toJSON',{
    transform:(doc,ret)=>{
      ret.id = ret._id.toString(); // Convierte _id de MongoDB a una propiedad "id" estándar
      delete ret._id; // Elimina el campo original _id
      delete ret.__v; // Elimina la versión interna de Mongoose
      return ret;
    }
    });

module.exports= mongoose.model('Categoria',categoriaSchema);
