import { Router } from "express"
import CartManager from "../controllers/cart-manager-db.js"

const cartInstance = new CartManager()
const router = Router()

/**
 * @openapi
 * tags:
 *   name: Carritos
 *   description: Operaciones relacionadas con carritos de compra
 */

/**
 * @openapi
 * /api/carts:
 *   post:
 *     summary: Crear un nuevo carrito
 *     tags: [Carritos]
 *     responses:
 *       '200':
 *         description: Carrito creado correctamente
 *       '500':
 *         description: No se pudo crear el carrito
 */

router.post("/", async (req,res) =>{
    try {
        const newCart = await cartInstance.createCart()
        res.status(200).send({message:"Carrito creado correctamente", newCart})
    } catch (error) {
        res.status(500).json({error: "No se pudo crear el carrito"})
    }
})

/**
 * @openapi
 * /api/carts/{cid}:
 *   get:
 *     summary: Obtener los productos de un carrito por ID
 *     tags: [Carritos]
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del carrito
 *     responses:
 *       '200':
 *         description: Productos obtenidos con éxito
 *       '500':
 *         description: Error al obtener los productos del carrito
 */

router.get("/:cid", async (req,res) =>{
    const cartId = req.params.cid
    try {
        const cart = await cartInstance.getCartById(cartId)
        if (cart) {
            const cartProducts = cart.products
            res.send(cartProducts)
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

/**
 * @openapi
 * /api/carts/{cid}/product/{pid}:
 *   post:
 *     summary: Agregar un producto a un carrito por ID
 *     tags: [Carritos]
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del carrito
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     responses:
 *       '200':
 *         description: Producto agregado correctamente
 *       '400':
 *         description: No se encontró ese carrito
 *       '500':
 *         description: No se pudo agregar el producto al carrito
 */

router.post("/:cid/product/:pid", async(req,res)=>{
    const {cid, pid} = req.params
    try {
        const cart = await cartInstance.addProductToCard(cid, pid)
        if (cart){
            return res.status(200).send({message:"Producto agregado correctamente",cart})
        } else return res.status(400).send("No se encontró ese carrito")
    } catch (error) {
        res.status(500).json({error: "No se pudo agregar el producto al carrito"})
    }
})

/**
 * @openapi
 * /api/carts/{cid}/products/{pid}:
 *   delete:
 *     summary: Eliminar un producto de un carrito por ID
 *     tags: [Carritos]
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del carrito
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     responses:
 *       '200':
 *         description: Producto eliminado correctamente
 *       '400':
 *         description: No se encontró ese carrito
 *       '500':
 *         description: No se pudo eliminar el producto del carrito
 */

router.delete("/:cid/products/:pid", async(req,res)=>{
    const {cid, pid} = req.params
    try {
        const cart = await cartInstance.deleteProductFromCart(cid, pid)
        if (cart){
            return res.status(200).send({message:"Producto eliminado correctamente",cart})
        } else return res.status(400).send("No se encontró ese carrito")
    } catch (error) {
        res.status(500).json({error: "No se pudo agregar el producto al carrito"})
    }
})

/**
 * @openapi
 * /api/carts/{cid}:
 *   put:
 *     summary: Actualizar todos los productos de un carrito por ID
 *     tags: [Carritos]
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del carrito
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Define las propiedades actualizadas del carrito aquí
 *     responses:
 *       '200':
 *         description: Carrito actualizado correctamente
 *       '400':
 *         description: No se encontró ese carrito
 *       '500':
 *         description: No se pudo actualizar el carrito
 */


router.put("/:cid", async(req,res)=>{
    const {cid} = req.params
    try {
        const cart = await cartInstance.updateProducts(cid, req.body)
        if (cart){
            return res.status(200).send({message:"Carrito actualizado correctamente",cart})
        } else return res.status(400).send("No se encontró ese carrito")
    } catch (error) {
        res.status(500).json({error: "No se pudo agregar el producto al carrito"})
    }
})

/**
 * @openapi
 * /api/carts/{cid}/product/{pid}:
 *   put:
 *     summary: Actualizar la cantidad de un producto en un carrito por ID
 *     tags: [Carritos]
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del carrito
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *             example:
 *               quantity: 3
 *     responses:
 *       '200':
 *         description: Cantidad modificada correctamente en el carrito
 *       '400':
 *         description: No se encontró ese carrito o producto
 *       '500':
 *         description: No se pudo modificar la cantidad del producto en el carrito
 */

router.put("/:cid/product/:pid", async(req,res)=>{
    const {cid, pid} = req.params
    const {quantity} = req.body
    try {
        const cart = await cartInstance.updateProductQuantity(cid, pid, quantity)
        if (cart){
            return res.status(200).send({message:"Cantidad modificada correctamente",cart})
        } else return res.status(400).send("No se encontró ese carrito")
    } catch (error) {
        res.status(500).json({error: "No se pudo agregar el producto al carrito"})
    }
})

/**
 * @openapi
 * /api/carts/{cid}:
 *   delete:
 *     summary: Eliminar todos los productos de un carrito por ID
 *     tags: [Carritos]
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del carrito
 *     responses:
 *       '200':
 *         description: Productos eliminados correctamente del carrito
 *       '400':
 *         description: No se encontró ese carrito
 *       '500':
 *         description: No se pudo eliminar los productos del carrito
 */

router.delete("/:cid", async(req,res)=>{
    const {cid} = req.params
    try {
        const cart = await cartInstance.deleteAllProducts(cid)
        if (cart){
            return res.status(200).send({message:"Productos eliminados correctamente",cart})
        } else return res.status(400).send("No se encontró ese carrito")
    } catch (error) {
        res.status(500).json({error: "No se pudo agregar el producto al carrito"})
    }
})

export default router