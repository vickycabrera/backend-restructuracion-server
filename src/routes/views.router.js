import express from "express"
const router = express.Router(); 

router.get("/", async(req,res)=>{
    const limit = req.query.limit
    try {
        const productos = await ProductModel.find().limit(limit)  
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

router.get("/chat", (req, res) => {
    try {
        res.render("chat")
    } catch (error) {
        res.status(500).json({error: "Error interno del servidor"})
    }
});


export default router

