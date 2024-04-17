import { UserModel } from "../models/user.model.js"
import { createHash, isValidPassword } from "../utils/hashbcrypt.js";

class UserService {
    async createNewUser({first_name, last_name, email, password: reqPassword, age}){
        try {
            const emailInUse = await UserModel.findOne({email});
            if (emailInUse) {
                throw new Error("Este email ya se encuentra en uso")
            }
            //Si el usuario tiene un email con la palabra "coderhouse" es admin
            const defineUserRole = (emailString) => {
                if (emailString.includes("coderhouse")) return "admin"
                return "user"
            }
            const newUser = await UserModel.create({
                first_name,
                last_name,
                email,
                password: createHash(reqPassword), 
                age,
                rol: defineUserRole(email)
            })
            const { password, ..._rest } = newUser._doc
            return _rest
        } catch (error) {
            throw new Error("Error al crear el usuario")
        }
    }
    async login(email, pwd){
        try {
            const user = await UserModel.findOne({email})
            if (!user) throw new Error("Usuario no valido") 
            if (!isValidPassword(pwd, user)) {
                throw new Error("Contraseña incorrecta") 
            }
            const { password, ..._rest } = user._doc
            return _rest
        } catch (error) {
            throw new Error("Error en el login")
        }
    }

}

export default UserService