import fs from "fs"

class CartManager {
    static ultId = 0 
    constructor(path){
        this.carts = []; 
        this.path = path
    }

    async getCarts() {
        return await this.readFile()
    }

    async createCart(){
        const cartsArray = await this.getCarts()
        CartManager.ultId = cartsArray.reduce((maxId, cart) => Math.max(maxId, cart.id), 0)
        const newCart = {id: ++CartManager.ultId, products: [] }
        await this.writeFile([...cartsArray, newCart])
    }

    async getCartById(cartId){
        const cartsArray = await this.getCarts()
        if (cartsArray) {
            const findedCart = cartsArray.find(cart => cart.id === cartId)
            if (findedCart) return findedCart
            else throw new Error (`No se pudo encontrar un carrito con el id ${cartId}`)
        } else throw new Error ("No se pudo leer el archivo")
    }

    async addProductToCart(productId, cartId){
        const cart = await this.getCartById(cartId)
        const { products } = cart
        let product = products.find(p => p.id === productId)
        let newProductsArray
        if (product) {
            newProductsArray = products.map(p =>
                p.id === productId
                ? { ...p, quantity: ++product.quantity }
                : p
            );
        } else newProductsArray = [...products, {id: productId, quantity: 1}]
        const oldCartArray = await this.getCarts()
        const newCartArray = oldCartArray.map(c =>
            c.id === cartId
            ? { ...c, products: newProductsArray }
            : c
        )
        await this.writeFile(newCartArray)
    }

    //Leer un archivo:
    async readFile(){
        try {
            const respuesta = await fs.promises.readFile(this.path, "utf-8")
            if (respuesta) {
                const cartsArray = JSON.parse(respuesta);
                return cartsArray;
            } else return []
        } catch (error) {
            console.log("No se pudo leer el archivo: ", error)
            return null
        }
    }
    //Crear un archivo:
    async writeFile(data){
        try {
            const formatedData = JSON.stringify(data, null, 2)
            await fs.promises.writeFile(this.path, formatedData)
        } catch (error) {
            console.log("No se pudo crear el archivo: ", error)
        }
    }
}

export default CartManager