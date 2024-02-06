import express, { urlencoded, json } from "express"
import exphbs from "express-handlebars"
import viewsRouter from "./routes/views.router.js"
import productsRouter from "./routes/products.router.js"
import ProductManager from "./controllers/product-manager.js";
import { Server } from 'socket.io';

const app = express()

//Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views"); 

//Middlewares
app.use(urlencoded({extended:true})) 
app.use(json()) 
app.use(express.static("./src/public"));

//Routing
app.use("/", viewsRouter);
app.use("/api/products", productsRouter)

const PUERTO = 8080

export const httpServer = app.listen(PUERTO, ()=>{
    console.log(`Escuchando en http://localhost:${PUERTO}`)
})

//Product Manager
const productJsonDir= "src/data/products.json"
const productManagerInstance = new ProductManager(productJsonDir)

//Crear instancia de socket para el server
const socketIo = new Server(httpServer, { cors: { origin: '*' } });

socketIo.on("connection", async (socket) => {
    console.log("Un cliente se conectó conmigo");
    socket.emit("productos", await productManagerInstance.getProducts());
    socket.on("eliminarProducto", async (id) =>{
        await productManagerInstance.deleteProduct(id)
        socketIo.sockets.emit("productos", await productManagerInstance.getProducts())
    })
    socket.on("agregarProducto", async (producto) =>{
        await productManagerInstance.addProduct(producto)
        socketIo.sockets.emit("productos", await productManagerInstance.getProducts())
    })
})



