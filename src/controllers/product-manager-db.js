import { ProductModel } from "../models/product.model.js";

class ProductManager {

    async addProduct({title, description, price, category, stock, code, status}){
        try {
            if (!title || !description || !price || !category || !stock || !code){
                throw new Error ("Todos los campos son obligatorios")
            }
            const productExists = await ProductModel.findOne({code})
            if (productExists) throw new Error("Ya existe un producto con ese código")
            const newProduct = new ProductModel({
                title,
                description,
                price,
                category, 
                stock,
                code,
                status: status || true,
            })
            await newProduct.save()
        } catch (error) {
            console.log ("Error al crear un nuevo producto", error)
            throw error
        }
    }

    async getProducts(limit){
        try {
            const products = await ProductModel.find().limit(limit)
            return products
        } catch (error) {
            console.log ("Error al traer los productos", error)
            throw error
        }
    }

    async getProductById(id){
        try {
            const product = await ProductModel.findById(id)
            if (!product) {
                throw new Error ("producto no encontrado")
            } else return product
        } catch (error) {
            console.log ("Error al buscar el producto por id", error)
            throw error
        }
    }
    async updateProduct(id, product){
        try {
            const updateProduct = await ProductModel.findByIdAndUpdate(id, product)
            if (!updateProduct) throw new Error ("producto no encontrado")
            return updateProduct
        } catch (error) {
            console.log ("Error al buscar actualizar producto por id", error)
            throw error
        }
    }

    async deleteProduct(id){
        try {
            const deleteProduct = await ProductModel.findByIdAndDelete(id)
            if (!deleteProduct) throw new Error ("producto no encontrado")
            return deleteProduct
        } catch (error) {
            console.log ("Error al eliminar producto por id", error)
            throw error
        }
    }
}

export default ProductManager