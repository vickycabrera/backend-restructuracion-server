//Instalamos: npm i passport passport-local

import passport from "passport"
import local from "passport-local"
import GithubStrategy from "passport-github2"

//Importamos los modulos 
import UserModel from "../models/user.model.js"
import { createHash, isValidPassword } from "../utils/hashbcrypt.js"

const LocalStrategy = local.Strategy

export const initializePassport = () => {
    passport.use("register", new LocalStrategy({
        passReqToCallback: true,
        //para acceder al objeto request
        usernameField: "email"
    }, async (req, username, password, done) => {
        const {first_name, last_name, email, age}= req.body
        try {
            //verificamos si ya existe un registro con ese mail
            let user = await UserModel.findOne({email})
            if (user) return done(null, false)
            //si no existe voy a crear un registro nuevo
            let newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password)
            }
            let result = await UserModel.create(newUser)
            //Si todoo resulta bien, 
            //podemos mandar done con el usuario generado
            return done(null, result)
        } catch (error) {
            done(error)
        }
    }))
    //Agregamos otra estrategia ahora para el login
    passport.use("login", new LocalStrategy({
        usernameField: "email",
    }, async (email, password, done)=>{
        try {
            const user = await UserModel.findOne({email})
            if (!user) return done(null, false)
            if (!isValidPassword(password,user)) return done(null, false)
            return done(null, user)
        } catch (error) {
            done(error)
        }
    }))
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport.deserializeUser(async (id, done) => {
        let user = await UserModel.findById({_id:id});
        done(null, user);
    })
    //Estrategia para GitHub
    passport.use("github", new GithubStrategy({
        clientID: "Iv1.d2405492b88c0090",
        clientSecret: "8a276eecfe27df194295c71a7bae11588ee1848e",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    }, async(accessToken, refreshToken, profile, done)=>{
        try {
            const user = await UserModel.findOne({email: profile._json.email})
            if(!user) {
                const newUser = {
                    email: profile._json.email,
                    first_name: profile._json.name,
                    last_name: "secreto",
                    age: 10,
                    password: "secreto"
                }
                const result = await UserModel.create(newUser)
                done(null, result)
            } else {
                done(null, user)
            }
        } catch (error) {
            return done(error)
        }
    }))

}

