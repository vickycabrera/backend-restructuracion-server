import { Router } from "express"
import CartManager from "../controllers/cart-manager.js"

const router = Router()

const cartJsonDir= "src/data/carts.json"
const cartManagerInstance = new CartManager(cartJsonDir)

router.post("/", async(req,res)=>{
    try {
        await cartManagerInstance.createCart()
        res.send("Carrito creado correctamente")
    } catch (error) {
        res.status(500).json({error: "No se pudo crear el carrito"})
    }
})

router.get("/:cid", async(req,res)=>{
    const cartId = parseInt(req.params.cid)
    try {
        const cart = await cartManagerInstance.getCartById(cartId)
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
    const cartId = parseInt(cid)
    const productId = parseInt(pid)
    try {
        await cartManagerInstance.addProductToCart(productId, cartId)
        res.send("Producto agregado correctamente")
    } catch (error) {
        res.status(500).json({error: "No se pudo agregar el producto al carrito"})
    }
})

export default router