import { Context } from "telegraf";
import { TelegramResponseType } from "../../enums";
import { BotResponse, TelegramUser } from "../../interfaces";
import getOrders from "../dbfunctions/getOrders";
import getUser from "../dbfunctions/getUser";
import sendBotResponses from "../../core/sendBotResponses";

export async function ordersController(ctx: Context) {
    ctx.telegram.sendChatAction(ctx.chat!.id, "typing");
    const user = await getUser(ctx.from as TelegramUser);
    if (user) {
        const orders = await getOrders(user);
        if (orders && orders.length) {
            const responses: BotResponse[] = orders.map((order) => {
                const strings = [
                    `<i>${order.orderItems[0].name} ta ${order.orderItems[0].price}</i>`,
                    `<b>Buyurtma raqami:</b> <code>${order._id}</code>`,
                    `<b>Maxsulot narxi:</b> $${order.orderItems[0].price}`,
                    `<b>Buyurtma tan narxi:</b> $${order.orderItemsPrice}`,
                    `<b>Yetkizib berish narxi:</b> $${order.shippingPrice}`,
                    `<b>Hammasi bo\`lib:</b> $${order.totalPrice}`,
                    `<b>To\`lov usuli:</b> $${order.paymentMethod}`,
                    `<b>Buyurtma egasi:</b> ${user.firstName}`,
                    `<b>Aloqa raqami:</b> ${order.contact}`,
                    `<b>Yetkizib berish manzili:</b> ${order.address}`,
                    `<b>Buyurtma statusi:</b> <code>${order.status}</code>`,
                ];
                return {
                    type: TelegramResponseType.Text,
                    text: strings.join("\n"),
                };
            });
            sendBotResponses(ctx, responses);
        } else {
            ctx.replyWithHTML("Hozirda sizda aktiv buyurtmalar mavjud emas.");
        }
    }
}
