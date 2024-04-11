import mongoose from "mongoose";
const CategoryEnum = ["None", "Premium", "Featured", "Classic"];
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String },
    createdBy: { type: String, required: true },
    description: { type: [String], required: true },
    category: { type: String, enum: CategoryEnum, default: "None" },
    Image: { type: String },
    Video: { type: String },
}, {
    timestamps: true,
});
const Product = mongoose.model("Product", productSchema);
export default Product;
