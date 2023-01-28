import Product, { IProduct } from "../models/Product.model";
import "../index";
const products: IProduct[] = [
    {
        name: "Pepperoni Pizza",
        price: 5,
        image: "https://asset.cloudinary.com/yelpcampprojectjondoe/ed4abfc98bd332399b60e00e79e7a5a3",
    },
    {
        name: "Beef Pizza",
        price: 7,
        image: "https://asset.cloudinary.com/yelpcampprojectjondoe/f772806b8b91bec7c293ae5a5504d0d9",
    },
];

(async function () {
    try {
        console.log(`Deleting all products`);
        await Product.deleteMany();
        console.log(`Seeding new products`);
        await Product.create(products);
        process.exit(1);
    } catch (error) {
        throw error;
    }
})();
