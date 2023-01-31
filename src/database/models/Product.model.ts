import { Schema, model, Types } from "mongoose";

export interface IProduct {
    _id?: Types.ObjectId;
    name?: string;
    description?: string;
    image: string;
    price: number;
}

const productSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});
const Product = model<IProduct>("Product", productSchema);

export default Product;
