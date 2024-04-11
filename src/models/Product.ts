import mongoose, { Document, Schema } from "mongoose";

interface IProductType extends Document {
  name: string;
  price: number; 
  location?: string; 
  createdBy: string;
  description: string[]; 
  category: string;
  Image?: string; 
  Video?: string; 
}

const CategoryEnum = ["None", "Premium", "Featured", "Classic"];

const productSchema: Schema<IProductType> = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String },
    createdBy: { type: String, required: true },
    description: { type: [String], required: true },
    category: { type: String, enum: CategoryEnum, default: "None" },
    Image: { type: String },
    Video: { type: String },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model<IProductType>("Product", productSchema);

export default Product;
