import { Struct, struct } from "pb-util";
import { Markup } from "telegraf";
import Order, {
    IOrder,
    OrderStatus,
    PaymentMethod,
} from "../../../../database/models/Order.model";
import Product from "../../../../database/models/Product.model";
import { TelegramResponseType } from "../../../enums";
import { BotResponse } from "../../../interfaces";
import findUser from "../../dbfunctions/findUser";

export default async function registerOrder(params: Struct | undefined) {
    if (params) {
        const parameters = struct.decode(params);
        const product = await Product.findById(parameters.product);
        const user = await findUser(parameters.userId as string);
        if (user && product) {
            const shippingPrice = 0;

            const orderItems = [
                {
                    product: product!._id,
                    qty: parameters.qty ? (parameters.qty as number) : 1,
                    price: product!.price,
                    name: product!.name,
                },
            ];
            const orderItemsPrice = product.price * orderItems[0].qty;
            const totalPrice = orderItemsPrice + shippingPrice;
            const order: IOrder = {
                user: user._id,
                orderItems,
                orderItemsPrice,
                shippingPrice,
                totalPrice,
                paymentMethod: PaymentMethod.Cash,
                isPaid: false,
                isDelivered: false,
                status: OrderStatus.Placed,
                chatId: parameters.chatId as number,
                userConfirmed: false,
                contact: `${parameters.contact}`,
                address: parameters.address as string,
                isCancelled: false,
            };
            const savedOrder = await Order.create(order);
            const strings = [
                `Buyurtma:`,
                `<i>${parameters.qty} ta ${product?.name}</i>`,
                `<b>Maxsulot narxi:</b> $${product.price}`,
                `<b>Buyurtma tan narxi:</b> $${orderItemsPrice}`,
                `<b>Yetkizib berish narxi:</b> $${shippingPrice}`,
                `<b>Hammasi bo\`lib:</b> $${totalPrice}`,
                `<b>Buyurtma egasi:</b> ${parameters.firstName}`,
                `<b>Aloqa raqami:</b> ${parameters.contact}`,
                `<b>Yetkizib berish manzili:</b> ${parameters.address}`,
                `<b>Buyurtmani tasdiqlaysizmi?</b>`,
            ];
            const response: BotResponse = {
                type: TelegramResponseType.Card,
                text: strings.join("\n"),
                buttons: Markup.inlineKeyboard([
                    Markup.button.callback(
                        "Tasdiqla",
                        `orderconfirmed:order:${savedOrder._id}`
                    ),
                    Markup.button.callback(
                        "Bekor qil",
                        `orderrejected:order:${savedOrder._id}`
                    ),
                ]),
            };
            return [response];
        } else {
            return;
        }
    }
}
