import { IOrder } from "../../../database/models/Order.model";
import Order from "../../../database/models/User.model";

export default async function findOrder(orderId: string) {
    try {
        const order = await Order.findById(orderId);
        if (order) {
            return order;
        }
        return null;
    } catch (error) {
        console.error(`Error in getting order`);
        console.error(error);
    }
}
