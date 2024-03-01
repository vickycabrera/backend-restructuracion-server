import express from "express"
import ProductManager from "../controllers/product-manager-db.js"
import CartManager from "../controllers/cart-manager-db.js"

const router = express.Router(); 
const newPMinstance = new ProductManager()
const cartInstance = new CartManager()

router.get("/chat", (req, res) => {
    try {
        res.render("chat")
    } catch (error) {
        res.status(500).json({error: "Error interno del servidor"})
    }
});

router.get("/products", async(req,res)=>{
    const {limit, page, sort, query} = req.query
    const search = JSON.parse(query)
    const sortDirection = JSON.parse(sort)
    try {
        const result = await newPMinstance.getProducts(limit, page, sortDirection, search)
        const products = result.docs.map( product => {
            const {_id, ...rest} = product.toObject();
            return rest;
        })
        res.render("products",{
            products: products,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            currentPage: result.page,
            totalPages: result.totalPages,
        })
    } catch (error) {
        res.status(500).json({error: "No se puedo encontrar los productos"})
    }
})

router.get("/carts/:cid", async(req,res)=>{
    const {cid} = req.params
    try {
        const result = await cartInstance.getCartById(cid)
        const products = result.products.map(item => {
            return {
                ...item.product.toObject(),
                quantity: item.quantity
            }
        })
        res.render("carts",{
            productsInCart: products,
        })
    } catch (error) {
        res.status(500).json({error: "No se puedo encontrar los productos"})
    }
})

export default router

