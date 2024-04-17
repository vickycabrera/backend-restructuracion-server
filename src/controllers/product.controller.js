import ProductService from "../services/products.services.js";
const productService = new ProductService()

class ProductController {
    async getProducts(req, res) {
        const {limit, page, sort, query} = req.query
        const search = query ? JSON.parse(query) : undefined
        const sortDirection = sort ? JSON.parse(sort) : undefined
        try {
            const products = await productService.getProducts(limit, page, sortDirection, search);
            res.json(products);
        } catch (error) {
            res.status(500).json({error: "No se pudo encontrar los productos"});
        }
    }
    async getProductById(req, res) {
        try {
            const productId = req.params.pid
            const product = await productService.getProductById(productId);
            res.json(product);
        } catch (error) {
            res.status(500).json({error: "No se pudo obtener el producto"});
        }
    }
    async createProduct(req, res) {
        try {
            const product = req.body
            const newProduct = await productService.createProduct(product);
            res.json(newProduct);
        } catch (error) {
            res.status(500).json({error: "No se puedo crear un carrito"});
        }
    }
    async updateProduct(req, res) {
        try {
            const productId = req.params.pid
            const product = req.body
            const newProduct = await productService.updateProduct(productId, product);
            res.json(newProduct);
        } catch (error) {
            res.status(500).json({error: "No se puedo actualizar un producto"});
        }
    }
    async deleteProduct(req, res) {
        try {
            const productId = req.params.pid
            const productDeleted = await productService.deleteProduct(productId);
            res.json(productDeleted);
        } catch (error) {
            res.status(500).json({error: "No se puedo eliminar el producto"});
        }
    }
}

export default ProductController