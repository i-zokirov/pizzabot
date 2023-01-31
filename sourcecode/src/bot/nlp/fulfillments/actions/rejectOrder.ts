import { Struct, struct } from "pb-util";
import Order from "../../../../database/models/Order.model";
import { TelegramResponseType } from "../../../enums";
import { BotResponse } from "../../../interfaces";
import findUser from "../../dbfunctions/findUser";

export default async function rejectOrder(params: Struct | undefined) {
    if (params) {
        const parameters = struct.decode(params);
        const user = await findUser(parameters.userId as string);
        const order = await Order.findById(parameters.order);

        if (user && order) {
            await Order.findByIdAndUpdate(order._id, {
                isCancelled: true,
                userConfirmed: false,
            });
            const response: BotResponse = {
                type: TelegramResponseType.Text,
                text: `Buyurtma bekor qilindi!`,
            };
            return [response];
        }
    }
}
