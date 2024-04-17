import express from "express"
import ProductService from "../services/products.services.js";
import CartService from "../services/carts.services.js";

import passport from "passport";

const router = express.Router(); 
const productService = new ProductService()
const cartService = new CartService()


router.get("/", (req, res) => {
    try {
        res.redirect ("/login")
    } catch (error) {
        res.status(500).json({error: "Error interno del servidor"})
    }
});

router.get("/chat", (req, res) => {
    try {
        res.render("chat")
    } catch (error) {
        res.status(500).json({error: "Error interno del servidor"})
    }
});

router.get(
    "/products", 
    passport.authenticate("jwt", {session:false}), 
    async(req, res) => {
        try {
            const {limit, page, sort, query} = req.query
            const search = query ? JSON.parse(query) : undefined
            const sortDirection = sort ? JSON.parse(sort) : undefined
            const result = await productService.getProducts(limit, page, sortDirection, search);
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
                user: req.user
            })
        } catch (error) {
            res.status(500).json({error: "No se puedo encontrar los productos"})
        }
})

router.get(
    "/carts/:cid", 
    passport.authenticate("jwt", {session:false}), 
    async(req, res) => {
        try {
            const cartId = req.params.cid
            const result = await cartService.getCartById(cartId)
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

// Ruta para el formulario de login
router.get("/login", (req, res) => {
    res.render("login");
});

// Ruta para el formulario de registro
router.get("/register",  (req, res) => {
    res.render("register");
});

router.get(
    "/admin", 
    passport.authenticate("jwt", {session:false}), 
    (req, res) => {
        if (req.user.rol !== "admin"){ 
            return res.status(403).send("Acceso denegado")
        }
        res.render("admin");
})

export default router

