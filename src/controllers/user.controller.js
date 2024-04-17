import jwt from "jsonwebtoken";
import UserService from "../services/user.services.js";
const userService = new UserService()

class UserController {
    async register(req, res) {
        try {
            const newUser = await userService.createNewUser(req.body);
            const token = jwt.sign({...newUser}, "coderhouse", {expiresIn:"1h"});
            res.cookie("coderCookieToken", token, {
                maxAge: 3600000, //1 hora de expiración
                httpOnly: true  
            });
            res.redirect("/products");
        } catch (error) {
            res.status(500).json({error: "Error en el registro"});
        }
    }
    async login(req, res) {
        const {email, password} = req.body;
        try {
            const user = await userService.login(email, password)
            const token = jwt.sign({...user}, "coderhouse", {expiresIn:"1h"});
            res.cookie("coderCookieToken", token, {
                maxAge: 3600000, // 1 hora de expiración
                httpOnly: true 
            });
            res.redirect("/products");
        } catch (error) {
            res.status(500).json({error: "Error en la autenticación"});
        }
    }
    async logout(req, res){
        try {
            res.clearCookie("coderCookieToken");
            res.redirect("/login");
        } catch (error) {
            res.status(500).json({error: "Error en el logout"});
        }
    }
}

export default UserController