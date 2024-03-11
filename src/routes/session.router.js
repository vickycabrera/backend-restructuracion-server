import express from "express";
import UserModel from "../models/user.model.js";
const router = express.Router();

//Login
router.post("/login", async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await UserModel.findOne({email})
        if (user) {
            if (user.password === password) {
                req.session.login = true
                req.session.user = {...user._doc}
                res.redirect("/products")
            } else return res.status(401).send("Contraseña no válida")
        } else return res.status(404).send({error: "Usuario no encontrado"})
        
    } catch (error) {
        res.status(500).send("Error en el login")
    }
});

//Logout
router.get("/logout", async (req,res)=> {
    if(req.session.login){
        req.session.destroy()
    }
    res.redirect("/login")
})

export default router