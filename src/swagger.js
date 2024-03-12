import swaggerJSDoc from "swagger-jsdoc"

const options = {
    definition: {
        openapi: '3.0.0',
            info: {
            title: 'API ecommerce',
            version: '1.0.0',
            description: 'CRUD de productos, carritos, usuarios, etc',
            },
    },
    apis: [`src/routes/*.router.js`], 
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec