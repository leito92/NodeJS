import mongoose  from 'mongoose'
const { Schema } = mongoose;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
},
    { timestamps: true }
);
ProductSchema.index({name: "text"})

const Product = mongoose.model("Product", ProductSchema)
export default Product