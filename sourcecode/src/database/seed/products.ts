import Product, { IProduct } from "../models/Product.model";
import "../index";
// const products: IProduct[] = [
//     {
//         name: "Pepperoni Pizza",
//         price: 5,
//         image: "https://asset.cloudinary.com/yelpcampprojectjondoe/ed4abfc98bd332399b60e00e79e7a5a3",
//     },
//     {
//         name: "Beef Pizza",
//         price: 7,
//         image: "https://asset.cloudinary.com/yelpcampprojectjondoe/f772806b8b91bec7c293ae5a5504d0d9",
//     },
// ];
const products: IProduct[] = [
    {
        name: "Pepperoni Pizza",
        price: 5,
        image: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F19%2F2014%2F07%2F10%2Fpepperoni-pizza-ck-x.jpg&q=60",
    },
    {
        name: "Beef Pizza",
        price: 7,
        image: "https://img.freepik.com/darmowe-zdjecie/widok-z-gory-pizzy-pepperoni-pokrojonej-na-szesc-plasterkow_141793-2157.jpg?w=2000",
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
