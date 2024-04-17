import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true,
        index:true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    rol: {
        type: String, 
        enum: ["admin", "user"], //Enumera los roles permitidos
        default: "user" //Asignamos por default "user"
    }
})

export const UserModel = mongoose.model("user", userSchema)