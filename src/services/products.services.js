import { ProductModel } from "../models/product.model.js";

class ProductService {
    async createProduct({title, description, price, category, stock, code, status}){
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
            return await newProduct.save()
        } catch (error) {
            throw new Error("Error al crear un producto");
        }
    }
    async getProducts(limit, page, sortDirection, query){
        const resultsPerPage = limit || 10
        let currentPage = page || 1
        //TO DO: chequear sortDirection y query
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
            throw new Error("Error al buscar los productos");
        }
    }
    async getProductById(id){
        try {
            const product = await ProductModel.findById(id)
            if (!product) throw new Error ("No se encontró un producto con ese id")
            return product
        } catch (error) {
            throw new Error ("Error al obtener el producto por id")
        }
    }
    async updateProduct(id, product){
        try {
            const updateProduct = await ProductModel.findByIdAndUpdate(id, product)
            if (!updateProduct) throw new Error ("producto no encontrado")
            return updateProduct
        } catch (error) {
            throw new Error ("Error al actualizar el producto por id")
        }
    }
    async deleteProduct(id){
        try {
            const deleteProduct = await ProductModel.findByIdAndDelete(id)
            if (!deleteProduct) throw new Error ("producto no encontrado")
            return deleteProduct
        } catch (error) {
            throw new Error ("Error al eliminar el producto")
        }
    }
}

export default ProductService