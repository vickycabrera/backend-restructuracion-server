import { Router } from "express"
import CartManager from "../controllers/cart-manager-db.js"

const cartInstance = new CartManager()
const router = Router()

router.post("/", async (req,res) =>{
    try {
        const newCart = await cartInstance.createCart()
        res.status(200).send({message:"Carrito creado correctamente", newCart})
    } catch (error) {
        res.status(500).json({error: "No se pudo crear el carrito"})
    }
})

router.get("/:cid", async (req,res) =>{
    const cartId = req.params.cid
    try {
        const cart = await cartInstance.getCartById(cartId)
        if (cart) {
            const cartProducts = cart.products
            res.send(cartProducts)
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.post("/:cid/product/:pid", async(req,res)=>{
    const {cid, pid} = req.params
    try {
        const cart = await cartInstance.addProductToCard(cid, pid)
        if (cart){
            return res.status(200).send({message:"Producto agregado correctamente",cart})
        } else return res.status(400).send("No se encontró ese carrito")
    } catch (error) {
        res.status(500).json({error: "No se pudo agregar el producto al carrito"})
    }
})

export default router