import { Struct, struct } from "pb-util";
import Order from "../../../../database/models/Order.model";
import { TelegramResponseType } from "../../../enums";
import { BotResponse } from "../../../interfaces";
import findUser from "../../dbfunctions/findUser";

export default async function checkOrderStatus(params: Struct | undefined) {
    if (params) {
        try {
            const parameters = struct.decode(params);
            const user = await findUser(parameters.userId as string);
            const order = await Order.findById(parameters.order);

            if (user && order) {
                const response: BotResponse = {
                    type: TelegramResponseType.Text,
                    text: `Buyurtma statusi: ${order.status}`,
                };
                return [response];
            } else if (user && !order) {
                const response1: BotResponse = {
                    type: TelegramResponseType.Text,
                    text: `Buyurtma topilmadi. `,
                };
                const response2: BotResponse = {
                    type: TelegramResponseType.Text,
                    text: `<b>Tip:</b> Aktiv buyurtmalarni ko\`rish uchun /buyurtmalarim buyrug\`ini yuboring`,
                };
                return [response1, response2];
            }
        } catch (error) {
            const response1: BotResponse = {
                type: TelegramResponseType.Text,
                text: `Buyurtma topilmadi. `,
            };
            const response2: BotResponse = {
                type: TelegramResponseType.Text,
                text: `<b>Tip:</b> Aktiv buyurtmalarni ko\`rish uchun /buyurtmalarim buyrug\`ini yuboring`,
            };
            return [response1, response2];
        }
    }
}
