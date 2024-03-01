import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products: [{
        product:  {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products", 
            required: true
        },
        quantity: {
            type: Number, 
            required: true
        }
    }]
})
//Middleware Pre de Mongoose: 

// cartSchema.pre("findById", function(next) {
//     this.populate("products");
//     next();
// })

export const CartModel = mongoose.model("carts",cartSchema)