import express from "express"
import ProductManager from "../controllers/product-manager.js"

const router = express.Router(); 

const productJsonDir= "src/data/products.json"
const productManagerInstance = new ProductManager(productJsonDir)

router.get("/", async (req, res) => {
    try {
        const productos = await productManagerInstance.getProducts(); 
        res.render("home", {productos})
    } catch (error) {
        res.status(500).json({error: "Error interno del servidor"})
    }
})

router.get("/realtimeproducts", async (req, res) => {
    try {
        res.render("realtimeproducts")
    } catch (error) {
        res.status(500).json({error: "Error interno del servidor"})
    }
})

export default router

