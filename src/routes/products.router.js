import { Router } from "express"
import ProductManager from "../controllers/product-manager-db.js"

const newPMinstance = new ProductManager()
const router = Router()

router.get("/", async(req,res)=>{
    const limit = req.query.limit
    try {
        const products = await newPMinstance.getProducts(limit)
        res.send(products)
    } catch (error) {
        res.status(500).json({error: "No se puedo encontrar los productos"})
    }
})

router.get("/:pid", async(req,res)=>{
    const productId = req.params.pid
    try {
        const product = await newPMinstance.getProductById(productId)
        if (product) res.send(product)
        else res.send("Producto no encontrado") 
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.post("/", async(req,res)=>{
    try {
        await newPMinstance.addProduct(req.body)
        res.send({status:201, message:"Producto creado correctamente"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.put("/:pid",async (req,res)=>{
    const productId = req.params.pid
    const newProduct = req.body
    try {
        const product = await newPMinstance.updateProduct(productId, newProduct)
        if (!product) return res.send({status:400, message:"Producto no encontrado"})
        else res.send({status:201, message:"Producto actualizado correctamente"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.delete("/:pid",async(req,res)=>{
    const productId = req.params.pid
    try {
        await newPMinstance.deleteProduct(productId) 
        res.send({status:201, message:"Producto eliminado correctamente"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

export default router