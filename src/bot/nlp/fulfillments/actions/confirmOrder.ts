import { Struct, struct } from "pb-util";
import Order from "../../../../database/models/Order.model";
import { TelegramResponseType } from "../../../enums";
import { BotResponse } from "../../../interfaces";
import findUser from "../../dbfunctions/findUser";

export default async function confirmOrder(params: Struct | undefined) {
    if (params) {
        const parameters = struct.decode(params);
        const user = await findUser(parameters.userId as string);
        const order = await Order.findById(parameters.order);

        if (user && order) {
            const responsestrings = [
                `Buyurtma tasdiqlandi: \n`,
                `<i>${order.orderItems[0].name} ta ${order.orderItems[0].price}</i>`,
                `<b>Maxsulot narxi:</b> $${order.orderItems[0].price}`,
                `<b>Buyurtma tan narxi:</b> $${order.orderItemsPrice}`,
                `<b>Yetkizib berish narxi:</b> $${order.shippingPrice}`,
                `<b>Hammasi bo\`lib:</b> $${order.totalPrice}`,
                `<b>Buyurtma egasi:</b> ${user.firstName}`,
                `<b>Aloqa raqami:</b> ${order.contact}`,
                `<b>Yetkizib berish manzili:</b> ${order.address}`,
                `<b>Buyurtma statusi:</b> ${order.status}`,
            ];
            await Order.findByIdAndUpdate(order._id, { userConfirmed: true });
            const response: BotResponse = {
                type: TelegramResponseType.Text,
                text: responsestrings.join("\n"),
            };
            return [response];
        }
    }
}
