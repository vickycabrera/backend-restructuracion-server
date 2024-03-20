import express from "express";
import passport from "passport";
const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: Sesiones
 *   description: Operaciones relacionadas con la autenticación y sesiones de usuario
 */


//Version con passport 
router.post("/login", passport.authenticate("login", {failureRedirect: "/api/sessions/faillogin"}), 
async (req, res)=>{
    if (!req.user) return res.status(400).send({status: "error"})
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email
    }
    req.session.login = true
    res.redirect("/products")
})

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

router.get("/faillogin", async (req, res)=> {
    res.send({error: "fallo el loginnnn"})
})

export default router