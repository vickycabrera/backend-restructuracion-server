import express from "express";
import UserModel from "../models/user.model.js";
const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: Sesiones
 *   description: Operaciones relacionadas con la autenticación y sesiones de usuario
 */

/**
 * @openapi
 *   /api/sessions/login:
 *     post:
 *       summary: Iniciar sesión de usuario
 *       tags: [Sesiones]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *       responses:
 *         '200':
 *           description: Sesión iniciada con éxito
 *         '401':
 *           description: Contraseña no válida
 *         '404':
 *           description: Usuario no encontrado
 *         '500':
 *           description: Error en el login
 */


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

/**
 * @openapi
 *   /api/sessions/logout:
 *     get:
 *       summary: Logout de la sesión
 *       tags: [Sesiones]
 *       responses:
 *         '200':
 *           description: Sesión destruida con éxito
 */

router.get("/logout", async (req,res)=> {
    if(req.session.login){
        req.session.destroy()
    }
    res.redirect("/login")
})

export default router