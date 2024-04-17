import express from "express";
import UserController from "../controllers/user.controller.js";

const router = express.Router();
const userController = new UserController()

router.post("/register", userController.register)
router.post("/login", userController.login)
router.get("/logout", userController.logout)

// /**
//  * @openapi
//  *  tags:
//  *   name: Usuarios
//  *   description: Operaciones relacionadas con la autenticación y sesiones de usuario
//  */

// /**
//  * @openapi
//  * /api/users/register:
//  *   post:
//  *     summary: Registro de usuario
//  *     description: |
//  *       Este endpoint permite registrar un nuevo usuario en el sistema.
//  *     tags: [Usuarios]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               first_name:
//  *                 type: string
//  *                 description: Nombre del usuario.
//  *               last_name:
//  *                 type: string
//  *                 description: Apellido del usuario.
//  *               email:
//  *                 type: string
//  *                 format: email
//  *                 description: Correo electrónico del usuario.
//  *               password:
//  *                 type: string
//  *                 description: Contraseña del usuario.
//  *               age:
//  *                 type: integer
//  *                 description: Edad del usuario.
//  *             required:
//  *               - first_name
//  *               - last_name
//  *               - email
//  *               - password
//  *               - age
//  *     responses:
//  *       '200':
//  *         description: Usuario registrado exitosamente.
//  *       '400':
//  *         description: El usuario ya existe.
//  *       '500':
//  *         description: Error interno del servidor.
//  */

// router.post("/register", async (req, res) => {
//     const {first_name, last_name, email, password: reqPassword, age} = req.body
//     try {
//         const emailInUse = await UserModel.findOne({email});
//         if (emailInUse) {
//             return res.status(400).send("El usuario ya existe");
//         }
//         //Si el usuario tiene un email con la palabra "coderhouse" es admin
//         const defineUserRole = (emailString) => {
//             if (emailString.includes("coderhouse")) return "admin"
//             return "user"
//         }
//         const newUser = await UserModel.create({
//             first_name,
//             last_name,
//             email,
//             password: createHash(reqPassword), 
//             age,
//             rol: defineUserRole(email)
//         })
//         const { password, ..._rest } = newUser._doc
//         const token = jwt.sign({..._rest}, "coderhouse", {expiresIn:"1h"});
//         res.cookie("coderCookieToken", token, {
//             maxAge: 3600000, //1 hora de expiración
//             httpOnly: true  
//         });
//         res.redirect("/products");
//     } catch (error) {
//         res.status(500).send("Error interno del servidor");
//     }
// })

// /**
//  * @openapi
//  * /api/users/login:
//  *   post:
//  *     summary: Iniciar sesión de usuario
//  *     description: |
//  *       Este endpoint permite a un usuario iniciar sesión en el sistema.
//  *     tags: [Usuarios]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 format: email
//  *                 description: Correo electrónico del usuario.
//  *               password:
//  *                 type: string
//  *                 description: Contraseña del usuario.
//  *             required:
//  *               - email
//  *               - password
//  *     responses:
//  *       '200':
//  *         description: Sesión iniciada correctamente.
//  *       '401':
//  *         description: Usuario no válido o contraseña incorrecta.
//  *       '500':
//  *         description: Error interno del servidor.
//  */

// router.post("/login", async (req, res) => {
//     const {email: reqEmail, password: reqPassword} = req.body;
//     try {
//         const usuarioEncontrado = await UserModel.findOne({email: reqEmail})
//         if (!usuarioEncontrado) return res.status(401).send("Usuario no valido") 
//         if (!isValidPassword(reqPassword, usuarioEncontrado)) {
//             return res.status(401).send("Contraseña incorrecta");
//         }
//         const { password, ..._rest } = usuarioEncontrado._doc
//         const token = jwt.sign({..._rest}, "coderhouse", {expiresIn:"1h"});
//         res.cookie("coderCookieToken", token, {
//             maxAge: 3600000, // 1 hora de expiración
//             httpOnly: true 
//         });
//         res.redirect("/products");
//     } catch (error) {
//         res.status(500).send("Error interno del servidor"); 
//     }
// })

// /**
//  * @openapi
//  * /api/users/logout:
//  *   get:
//  *     summary: Cerrar sesión de usuario
//  *     description: |
//  *       Este endpoint permite a un usuario cerrar sesión en el sistema, eliminando la cookie de autenticación y redirigiendo al usuario a la página de inicio de sesión.
//  *     tags: [Usuarios]
//  *     responses:
//  *       '302':
//  *         description: Sesión cerrada correctamente.
//  *         headers:
//  *           Location:
//  *             schema:
//  *               type: string
//  *               description: URL de la página de inicio de sesión.
//  *       '500':
//  *         description: Error interno del servidor.
//  */

// router.get("/logout", (req, res) => {
//     res.clearCookie("coderCookieToken");
//     res.redirect("/login");
// })

export default router