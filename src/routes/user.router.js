import express from "express";
import UserModel from "../models/user.model.js"
const router = express.Router();

//Registrar un nuevo usuario y guardar en MongoDB
router.post("/", async (req,res)=>{
    const {first_name, last_name, email, password, age} = req.body
    try {
        const userAlreadyExist = await UserModel.findOne({email})
        if (userAlreadyExist) return res.status(400).send("El email ya esta registrado")
        //Si no lo encuentra lo creamos
        const newUser = await UserModel.create({
            first_name,
            last_name,
            email,
            password, 
            age
        })
        req.session.login = true
        req.session.user = {...newUser._doc}
        res.redirect("/profile")        
    } catch (error) {
        res.status(500).send("Error al crear el usuario")
    }
})

export default router