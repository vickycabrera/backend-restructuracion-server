import { CartModel } from "../models/cart.model.js";
class CartManager {
    async createCart(){
        try {    
            const newCart = new CartModel()
            await newCart.save()
            return newCart
        } catch (error) {
            throw error
        }
    }
    async getCartById(id){
        try {
            const cart = await CartModel.findById(id).populate('products.product');
            if (!cart) throw new Error ("No se encontró un carrito con ese id")
            return cart
        } catch (error) {
            throw error
        }
    }
    async addProductToCard(cartId, productId){
        try {
            const cart = await this.getCartById(cartId)
            if (!cart) throw new Error("No existe un carrito con ese id")
            const product = cart.products.find(item => item.product.toString() === productId)
            if (!product) cart.products.push({product: productId, quantity: 1})
            else if (product.quantity) product.quantity++
            else product.quantity = 1
            cart.markModified("products")
            await cart.save()
            return cart 
    } catch (error) {
            throw error
        }
    }
    async deleteProductFromCart(cartId, productId){
        try {
            const cart = await CartModel.findById(cartId)
            if (!cart) throw new Error ("No se encontró un carrito con ese id")
            const filteredProducts = cart.products.filter(item => item.product.toString() !== productId)
            cart.products = filteredProducts
            cart.markModified("products")
            await cart.save()
            return cart
        } catch (error) {
            throw error
        }
    }
    async updateProducts(cartId, products){
        try {
            const cart = await CartModel.findById(cartId)
            if (!cart) throw new Error ("No se encontró un carrito con ese id")
            cart.products = products
            cart.markModified("products")
            await cart.save()
            return cart
        } catch (error) {
            throw error
        }
    }
    async updateProductQuantity(cartId, productId, newQuantity){
        try {
            const cart = await this.getCartById(cartId)
            if (!cart) throw new Error("No existe un carrito con ese id")
            const product = cart.products.find(item=>item.product.toString()===productId)
            if (!product) throw new Error ("No se encontró el producto dentro del carrito")
            productExist.quantity = newQuantity
            cart.markModified("products")
            await cart.save()
            return cart 
        } catch (error) {
            throw error
        }
    }
    async deleteAllProducts(cartId){
        try {
            const cart = await CartModel.findById(cartId)
            if (!cart) throw new Error ("No se encontró un carrito con ese id")
            cart.products = []
            cart.markModified("products")
            await cart.save()
            return cart
        } catch (error) {
            throw error
        }
    }   
}

export default CartManager