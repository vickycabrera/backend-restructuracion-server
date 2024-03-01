import { ProductModel } from "../models/product.model.js";

class ProductManager {
    async addProduct({title, description, price, category, stock, code, status}){
        try {
            if (!title || !description || !price || !category || !stock || !code){
                throw new Error ("Todos los campos son obligatorios")
            }
            const codeInUse = await ProductModel.findOne({code})
            if (codeInUse) throw new Error("Ya existe un producto con ese código")
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
    async getProducts(limit, page, sortDirection, query){
        const resultsPerPage = limit || 10
        let currentPage = page || 1
        try {
            const options = {
                limit: resultsPerPage, 
                page: currentPage,
                ...(sortDirection && {sort: {
                    price: sortDirection
                }})
            }
            const result = await ProductModel.paginate(
                {...query},
                {options}
            )
            return result
        } catch (error) {
            console.log ("Error al traer los productos", error)
            return {
                status: 500,
                message: error.message
            }
        }
    }
    async getProductById(id){
        try {
            const product = await ProductModel.findById(id)
            if (!product) throw new Error ("producto no encontrado")
            return product
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