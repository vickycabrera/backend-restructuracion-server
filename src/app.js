import express, { urlencoded, json } from "express"
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js" 

const app = express()

const PUERTO = 8080

app.use(urlencoded({extended:true})) 
app.use(json()) 

app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)

app.listen(PUERTO, ()=>{
    console.log(`Escuchando en http://localhost:${PUERTO}`)
})