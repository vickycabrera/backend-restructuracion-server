import CartService from "../services/carts.services.js";
const cartService = new CartService()

class CartController {
    async createCart(req, res) {
        try {
            const newCart = await cartService.createCart();
            res.json({
                status: "success",
                message: "Carrito creado correctamente",
                newCart
            })
        } catch (error) {
            res.status(500).json({error: "No se puedo crear un carrito"});
        }
    }
    async getCartById(req, res) {
        try {
            const cartId = req.params.cid
            const cart = await cartService.getCartById(cartId);
            res.json(cart.products);
        } catch (error) {
            res.status(500).json({error: "No se pudo obtener el carrito"});
        }
    }
    async addProductToCart(req, res) {
        try {
            const cartId = req.params.cid
            const productId = req.params.pid
            const cart = await cartService.addProductToCard(cartId, productId);
            res.json({
                status: "success",
                message: "Producto agregado correctamente",
                cart
            })
        } catch (error) {
            res.status(500).json({error: "No se pudo agregar el producto al carrito"});
        }
    }
    async deleteProductFromCart(req, res) {
        try {
            const cartId = req.params.cid
            const productId = req.params.pid
            const cart = await cartService.deleteProductFromCart(cartId, productId);
            res.json({
                status: "success",
                message: "Produco eliminado correctamente",
                cart
            })
        } catch (error) {
            res.status(500).json({error: "No se pudo eliminar el producto al carrito"});
        }
    }
    async rewriteProducts(req, res) {
        try {
            const cartId = req.params.cid
            const products = req.body
            const cart = await cartService.updateProducts(cartId, products);
            res.json({
                status: "success",
                message: "Carrito actualizado",
                cart
            })
        } catch (error) {
            res.status(500).json({error: "No se actualizar los productos del carrito"});
        }
    }
    async updateProductQty(req, res) {
        try {
            const cartId = req.params.cid
            const productId = req.params.pid
            const newQuantity = req.body.quantity
            const cart = await cartService.updateProductQuantity(cartId, productId, newQuantity);
            res.json({
                status: "success",
                message: "Carrito actualizado en sus cantidades",
                cart
            })
        } catch (error) {
            res.status(500).json({error: "No se pudo actualizar la cantidad del producto del carrito"});
        }
    }
    async deleteAllProducts(req, res) {
        try {
            const cartId = req.params.cid
            await cartService.deleteAllProducts(cartId);
            res.json({
                status: "success",
                message: "Todos los productos del carrito fueron eliminados",
                carrito
            })
        } catch (error) {
            res.status(500).json({error: "No se pudo eliminar los productos del carrito"});
        }
    }
}

export default CartController