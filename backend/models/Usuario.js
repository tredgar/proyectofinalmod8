const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    lastname:{
        type:String,
        required:true,
        trim:true
    },
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        default:'client'
    },
    status:{
        type:Boolean,
        default:true
    }
},
{
    timestamps:true
});

module.exports=model('Usuario',UsuarioSchema);