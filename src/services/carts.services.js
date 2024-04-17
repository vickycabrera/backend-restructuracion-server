import { CartModel } from "../models/cart.model.js";

class CartService {
    async createCart(){
        try {    
            const newCart = new CartModel()
            return await newCart.save()
        } catch (error) {
            throw new Error("Error al crear el carrito");
        }
    }
    async getCartById(id){
        try {
            const cart = await CartModel.findById(id).populate('products.product');
            if (!cart) throw new Error ("No se encontró un carrito con ese id")
            return cart
        } catch (error) {
            throw new Error ("Error al obtener el carrito por id")
        }
    }
    async addProductToCard(cartId, productId){
        try {
            const cart = await this.getCartById(cartId)
            const product = cart.products.find(item => item.product.toString() === productId)
            //TO DO - Chequear que el product Id corresponda a un producto real
            // sino responder que no existe
            if (!product) cart.products.push({product: productId, quantity: 1})
            else if (product.quantity) product.quantity++
            else product.quantity = 1
            cart.markModified("products")
            return await cart.save()
    } catch (error) {
        throw new Error ("Error al agregar producto al carrito")
        }
    }
    async deleteProductFromCart(cartId, productId){
        try {
            const cart = await this.getCartById(cartId)
            const filteredProducts = cart.products.filter(item => item.product.toString() !== productId)
            cart.products = filteredProducts
            cart.markModified("products")
            return await cart.save()
        } catch (error) {
            throw new Error ("Error al eliminar producto del carrito")
        }
    }
    async updateProducts(cartId, products){
        try {
            const cart = await this.getCartById(cartId)
            cart.products = products
            cart.markModified("products")
            return await cart.save()
        } catch (error) {
            throw new Error ("Error al actualizar productos del carrito")
        }
    }
    async updateProductQuantity(cartId, productId, newQuantity){
        try {
            const cart = await this.getCartById(cartId)
            const product = cart.products.find(item=>item.product.toString()===productId)
            if (!product) throw new Error ("No se encontró el producto dentro del carrito")
            product.quantity = newQuantity
            cart.markModified("products")
            return await cart.save()
        } catch (error) {
            throw new Error ("Error al actualizar cantidades de productos del carrito")
        }
    }
    async deleteAllProducts(cartId){
        try {
            const cart = await this.getCartById(cartId)
            cart.products = []
            cart.markModified("products")
            return await cart.save()
        } catch (error) {
            throw new Error ("Error al borrar los productos del carrito")
        }
    }   
}

export default CartService