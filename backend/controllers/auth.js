const response = require("express");
const Usuario= require("../models/Usuario");
const bcrypt = require("bcryptjs");
const {generarJWT} = require("../helpers/jwt");



const crearUsuario=async (req,res=response) =>{
   const { name, lastname, username, email, password } = req.body;
   
    try {
      let usuario = await Usuario.findOne({ email });

      if (usuario) {
        return res.status(400).json({
          ok: false,
          msg: "El correo electrónico ya está registrado.",
        });
      }
      usuario = await Usuario.findOne({ username });
      if (usuario) {
        return res.status(400).json({
          ok: false,
          msg: "El nombre de usuario ya está registrado, ingresa otro.",
        });
      }

      //Encriptar contraseña
      const salt = bcrypt.genSaltSync();
      const passwordHash = bcrypt.hashSync(password, salt);
   
      
      usuario = new Usuario({
        name,
        lastname,
        username,
        email,
        password: passwordHash,
        role: "client", // asignar el rol de cliente
        status: true,
      });

      await usuario.save();

      
      //Generar JWT
      const token = await generarJWT(usuario.id, usuario.name);
      

      res.status(201).json({
        ok: true,
        msg: "Usuario creado exitosamente",
        usuario: {
          id: usuario._id,
          name: usuario.name,
          lastname: usuario.lastname,
          username: usuario.username,
          email: usuario.email,
          token: token,
        },
      });

    }catch (error) {
        res.status(500).json({
            ok:false,
            msg:"Error al crear usuario ",
            error:error.message
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
                msg:"Los datos son incorrectos"
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
                msg:"Los datos son incorrectos"
            });
        }

        //generar JWT
        const token = await generarJWT(usuario.id, usuario.name);

        res.json({
          ok: true,
          uid: usuario.id,
          name: usuario.name,
          token: token,
         
        });

    }catch (error) {
        res.status(500).json({
            ok:false,
            msg:"Error al iniciar sesión"
        });
    }
    
};

const revalidarToken= async (req,res=response) =>{

    const {uid,name}=req;

    const token = await  generarJWT(uid,name);

    res.json({
      ok: true,
      msg: "Revalidación de token funcionando correctamente",
      token
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken

};
