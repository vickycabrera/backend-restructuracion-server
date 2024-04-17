import { Router } from "express";
import ProductController from "../controllers/product.controller.js";
const router = Router();

const productController = new ProductController()

router.get("/", productController.getProducts)
router.get("/:pid", productController.getProductById)
router.post("/", productController.createProduct)
router.put("/:pid", productController.updateProduct)
router.delete("/:pid", productController.deleteProduct)


// /**
//  * @openapi
//  * tags:
//  *   name: Productos
//  *   description: Operaciones relacionadas con productos
//  */

// /**
//  * @openapi
//  * /api/products/{pid}:
//  *   get:
//  *     summary: Obtener un producto por ID
//  *     tags: [Productos]
//  *     parameters:
//  *       - in: path
//  *         name: pid
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: ID del producto
//  *     responses:
//  *       '200':
//  *         description: Producto obtenido con éxito
//  *       '500':
//  *         description: Error al obtener el producto
//  */

// router.get("/:pid", async (req, res) => {
//     const productId = req.params.pid;
//     try {
//         const product = await newPMinstance.getProductById(productId);
//         if (product) res.send(product);
//         else res.send("Producto no encontrado");
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// /**
//  * @openapi
//  * /api/products:
//  *   post:
//  *     summary: Agregar un nuevo producto
//  *     tags: [Productos]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *                 title:
//  *                   type: string
//  *                 description:
//  *                   type: string
//  *                 price:
//  *                   type: number
//  *                 category:
//  *                   type: string
//  *                 code:
//  *                   type: string
//  *                 stock:
//  *                   type: integer
//  *                 status:
//  *                   type: boolean
//  *     responses:
//  *       '201':
//  *         description: Producto creado correctamente
//  *       '500':
//  *         description: Error al agregar el producto
//  */

// router.post("/", async (req, res) => {
//     try {
//         await newPMinstance.addProduct(req.body);
//         res.send({ status: 201, message: "Producto creado correctamente" });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// /**
//  * @openapi
//  * /api/products/{pid}:
//  *   put:
//  *     summary: Actualizar un producto por ID
//  *     tags: [Productos]
//  *     parameters:
//  *       - in: path
//  *         name: pid
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: ID del producto
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               // Define las propiedades actualizadas del producto aquí
//  *     responses:
//  *       '201':
//  *         description: Producto actualizado correctamente
//  *       '400':
//  *         description: Producto no encontrado
//  *       '500':
//  *         description: Error al actualizar el producto
//  */

// router.put("/:pid", async (req, res) => {
//     const productId = req.params.pid;
//     const newProduct = req.body;
//     try {
//         const product = await newPMinstance.updateProduct(productId, newProduct);
//         if (!product) return res.send({ status: 400, message: "Producto no encontrado" });
//         else res.send({ status: 201, message: "Producto actualizado correctamente" });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// /**
//  * @openapi
//  * /api/products/{pid}:
//  *   delete:
//  *     summary: Eliminar un producto por ID
//  *     tags: [Productos]
//  *     parameters:
//  *       - in: path
//  *         name: pid
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: ID del producto
//  *     responses:
//  *       '201':
//  *         description: Producto eliminado correctamente
//  *       '500':
//  *         description: Error al eliminar el producto
//  */

// router.delete("/:pid", async (req, res) => {
//     const productId = req.params.pid;
//     try {
//         await newPMinstance.deleteProduct(productId);
//         res.send({ status: 201, message: "Producto eliminado correctamente" });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

export default router;
