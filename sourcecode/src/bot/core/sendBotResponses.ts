import { Context } from "telegraf";
import { BotResponse } from "../interfaces";
import { TelegramResponseType } from "../enums";

export default function sendBotResponses(
    ctx: Context,
    botResponses: BotResponse[] | undefined
) {
    if (botResponses && botResponses?.length) {
        botResponses.forEach((response, indx) => {
            setTimeout(() => {
                if (response.type === TelegramResponseType.Text) {
                    if (response.text) {
                        ctx.replyWithHTML(response.text!);
                    }
                } else if (response.type === TelegramResponseType.Card) {
                    if (response.image) {
                        ctx.replyWithPhoto(
                            {
                                url: response.image.url,
                            },
                            {
                                caption: response.text,
                                parse_mode: "Markdown",
                                ...response.buttons,
                            }
                        );
                    } else {
                        if (response.text)
                            ctx.replyWithHTML(response.text, response.buttons);
                    }
                }
            }, 300 * indx);
        });
    }
}
