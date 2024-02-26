import mongoose from "mongoose"

mongoose.connect("mongodb+srv://vlcabrera92:coderhouse@cluster0.4c9dzop.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=> console.log("Conexión exitosa"))
    .catch((error)=> console.log("Error en la conexión"))

