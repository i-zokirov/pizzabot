import Product from "../../../database/models/Product.model";

export default async function getProducts() {
    try {
        const products = await Product.find();
        return products;
    } catch (error) {
        console.error(`Error in getting products`);
        console.error(error);
    }
}
