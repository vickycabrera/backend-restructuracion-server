import express, { urlencoded, json } from "express"
import exphbs from "express-handlebars"
import "./database.js"
//Routers
import viewsRouter from "./routes/views.router.js"
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import userRouter from "./routes/user.router.js";
//Modelos de MongoDb
import { MessageModel } from "./models/messages.model.js"
//Socket
import { Server } from 'socket.io';
//swagger
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from "./swagger.js"
//Passport
import { initializePassport } from "./config/passport.config.js"
import passport from "passport"
import cookieParser from "cookie-parser"

const app = express()

//Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views"); 
//Middlewares
app.use(urlencoded({extended:true})) 
app.use(json()) 
app.use(express.static("./src/public"));
app.use(cookieParser());
app.use(passport.initialize());
initializePassport()

//Routing
app.use("/", viewsRouter)
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/api/users", userRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

const PUERTO = 8080

export const httpServer = app.listen(PUERTO, () => {
    console.log(`Escuchando en http://localhost:${PUERTO}`)
})

//Crear instancia de socket para el server
const socketIo = new Server(httpServer, { cors: { origin: '*' } });

socketIo.on("connection", async (socket) => {
    socket.on("message", async (data) => {
        const newMessage = new MessageModel(data)
        await newMessage.save()
        const messages = await MessageModel.find()
        socketIo.sockets.emit("messagesLogs", messages)
    })
})



