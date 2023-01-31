import { Markup } from "telegraf";
import { TelegramResponseType } from "../../../enums";
import { BotResponse } from "../../../interfaces";
import getProducts from "../../dbfunctions/getProducts";

export default async function openMenu(): Promise<BotResponse[] | void> {
    try {
        const products = await getProducts();
        if (products?.length) {
            const responses: BotResponse[] = products.map((product) => {
                return {
                    type: TelegramResponseType.Card,
                    text: `${product.name} \nNarxi: ${product.price}$`,
                    buttons: Markup.inlineKeyboard([
                        Markup.button.callback(
                            "Buyurtma",
                            `placeorder:product:${product.id}`
                        ),
                    ]),
                    image: {
                        url: product.image,
                    },
                };
            });
            return [
                { type: TelegramResponseType.Text, text: `Bugungi menu da:` },
                ...responses,
            ];
        }
    } catch (error) {
        console.error(`Error in constructing response`);
        console.error(error);
    }
}
