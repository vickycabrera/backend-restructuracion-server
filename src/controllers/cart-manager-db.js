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
            const cart = await CartModel.findById(id)
            if (cart) {
                return cart
            } else throw new Error ("No se encontró un carrito con ese id")
        } catch (error) {
            throw error
        }
    }
    async addProductToCard(cartId, productId){
        try {
            const cart = await this.getCartById(cartId)
            if (cart) {
                const productExist = cart.products.find(item=>item.product.toString()===productId)
                if (productExist) {
                    if(productExist.quantity) productExist.quantity++
                    else productExist.quantity = 1
                } else cart.products.push({product: productId, quantity: 1})
                cart.markModified("products")
                await cart.save()
                return cart 
            }
            else throw new Error("No existe un carrito con ese id")
        } catch (error) {
            throw error
        }
    }
}

export default CartManager