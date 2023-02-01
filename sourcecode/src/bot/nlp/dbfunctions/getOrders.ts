import Order from "../../../database/models/Order.model";
import User, { IUser } from "../../../database/models/User.model";

export default async function getOrders(user: IUser) {
    try {
        const orders = await Order.find({
            user: user._id,
            isDelivered: false,
            isCancelled: false,
        });
        return orders;
    } catch (error) {
        console.error(`Error in getting user`);
        console.error(error);
    }
}
