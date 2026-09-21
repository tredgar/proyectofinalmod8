const response = require("express");
const Usuario= require("../models/Usuario");
const bcrypt = require("bcryptjs");
const {z}= require("zod");


const crearUsuario=async (req,res=response) =>{
    const { email, password } = req.body;
    //validación de datos con Zod
    /*const validation=schema.safeParse(req.body);
    if(!validation.success){
        return res.status(400).json({
            ok:false,
            msg:"Datos inválidos",
            errors:validation.error.errors
        });
    }*/
    try {
        let usuario= await Usuario.findOne({email});
        if(usuario){
            return res.status(400).json({
                ok:false,
                msg:"El usuario ya existe"
            });
        }
        
        usuario= new Usuario(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password,salt);

        await usuario.save();
        
        res.status(201).json({
            ok:true,
            uid:usuario.id,
            name:usuario.name
        });
    }catch (error) {
        res.status(500).json({
            ok:false,
            msg:"Error al crear usuario"
        });
    }

};

const loginUsuario=async (req,res=response) =>{
    const {email,password}=req.body;
    try {
        const usuario= await Usuario.findOne({email});
        if(!usuario){
            return res.status(400).json({
                ok:false,
                msg:"El usuario no existe con ese email"
            });
        }
        if(!usuario.status){
            return res.status(400).json({
                ok:false,
                msg:"La cuenta ha sido desactivada, contacte a soporte"
            });

        }
        const validPassword=bcrypt.compareSync(password,usuario.password);

       if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg:"Password incorrecto"
            });
        }
        res.json({
          ok: true,
          uid: usuario.id,
          name: usuario.name,
         
        });

    }catch (error) {
        res.status(500).json({
            ok:false,
            msg:"Error al crear usuario"
        });
    }
    
};

const revalidarToken=(req,res=response) =>{

    res.json({
        ok:true,
        msg:'Revalidación de token funcionando correctamente'
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken

};
