import fs from "fs"

class ProductManager {
    static ultId = 0
    constructor(path){
        this.products = []
        this.path = path
    }

    hasAllProperties(product){
        const {title, description, code, price, status, stock, category} = product
        return title && description && code && price && status && (stock !== undefined) && category;
    }

    isCodeAllreadyInUse (productCode, productsArray){
        return productsArray.some(p=>p.code === productCode)
    }

    async addProduct(newProduct){
        const productsInFile = await this.getProducts()
        if (!this.hasAllProperties(newProduct)) {
            throw new Error (`Faltan propiedades en el producto`)
        }
        else if (this.isCodeAllreadyInUse(newProduct.code, productsInFile)){
            throw new Error (`Ese código ya es usado por otro producto`)  
        }
        else {
            const productsInFile = await this.getProducts()
            ProductManager.ultId = productsInFile.reduce((maxId, product) => Math.max(maxId, product.id), 0);
            productsInFile.push({...newProduct, id: ++ProductManager.ultId}) 
            await this.writeFile(productsInFile)
        }
    }

    async getProducts() {
        return await this.readFile()
    }

    async getProductById(id){
        const productsArray = await this.getProducts()
        if (productsArray) {
            const findedProduct = productsArray.find(item => item.id == id)
            if (findedProduct) return findedProduct
            else throw new Error (`No se encontró el producto con el id ${id}`)
        } else throw new Error (`No se pudo leer el archivo`)
    }

    async updateProduct(id, newProduct){
        if (!this.hasAllProperties(newProduct)) {
            throw new Error (`Faltan propiedades en el producto`)
        }
        else {
            try {
                const allProducts = await this.getProducts()
                if (allProducts) {
                    const newArray = allProducts.map(p => 
                        p.id == id ?
                        {...newProduct, id: Number(id)} :
                        p
                    )
                    await this.writeFile(newArray)
                }
            } catch (error) {
                throw new Error (`No se pudo actualizar el producto`)
            }
        }
    }

    async deleteProduct(productId) {
        const products = await this.getProducts()
        if (products.some(p => p.id == productId)){
            const newArray = products.filter(p => p.id != productId)
            await this.writeFile(newArray)
        } else throw new Error (`No existe un producto con ese id`)
    }


    //Funciones del file system:

    //Crear un archivo:
    async writeFile(data){
        try {
            const formatedData = JSON.stringify(data, null, 2)
            await fs.promises.writeFile(this.path, formatedData)
        } catch (error) {
            console.log("No se pudo crear el archivo: ", error)
        }
    }

    //Leer un archivo:
    async readFile(){
        try {
            const respuesta = await fs.promises.readFile(this.path, "utf-8")
            if (respuesta) {
                const productsArray = JSON.parse(respuesta);
                return productsArray;
            } else return []
        } catch (error) {
            console.log("No se pudo leer el archivo: ", error)
            return null
        }
    }
}

export default ProductManager