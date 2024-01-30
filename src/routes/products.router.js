import { Router } from "express"
import ProductManager from "../controllers/product-manager.js"

const router = Router()

const productJsonDir= "src/data/products.json"
const productManagerInstance = new ProductManager(productJsonDir)

router.get("/", async(req,res)=>{
    const limit = req.query.limit
    try {
        const products = await productManagerInstance.getProducts()
        if (limit) {
            const cutedArray = products.slice(0, +limit)
            res.send(cutedArray)
        }   
        else res.send(products)
    } catch (error) {
        res.status(500).json({error: "No se puedo encontrar los productos"})
    }
})

router.get("/:pid", async(req,res)=>{
    const productId = req.params.pid
    try {
        const product = await productManagerInstance.getProductById(productId)
        if (product) res.send(product) 
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.post("/", async(req,res)=>{
    const newProduct = req.body
    try {
        await productManagerInstance.addProduct(newProduct)
        res.send({status:201, message:"Producto creado correctamente"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.put("/:pid",async (req,res)=>{
    const productId = req.params.pid
    const newProduct = req.body
    try {
        await productManagerInstance.updateProduct(productId, newProduct)
        res.send({status:201, message:"Producto actualizado correctamente"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.delete("/:pid",async(req,res)=>{
    const productId = req.params.pid
    try {
        await productManagerInstance.deleteProduct(productId) 
        res.send({status:201, message:"Producto eliminado correctamente"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})
export default router