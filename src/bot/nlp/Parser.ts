import { TelegramResponseType } from "../enums";
import { BotResponse, FulfillmentMessage } from "../interfaces";
import { Struct } from "pb-util";
import { Markup } from "telegraf";
import fulfillments from "./fulfillments";

class Parser {
    constructor(
        public messages: FulfillmentMessage[],
        public parameters?: Struct | undefined
    ) {}
    async parse(): Promise<BotResponse[] | []> {
        this.messages = this.messages.filter(
            (msg) => msg.platform === "TELEGRAM"
        );
        let result: BotResponse[] = [];
        for (let msg of this.messages) {
            switch (msg.message) {
                case TelegramResponseType.Text:
                    msg.text?.text?.forEach((txt) =>
                        result.push({
                            type: TelegramResponseType.Text,
                            text: txt,
                        })
                    );
                    break;
                case TelegramResponseType.Card:
                    let buttons = [];
                    if (msg.card?.buttons?.length) {
                        for (let btn of msg.card.buttons) {
                            if (btn.text && btn.postback)
                                buttons.push(
                                    Markup.button.callback(
                                        btn.text,
                                        btn.postback,
                                        false
                                    )
                                );
                        }
                    }

                    const inlineKeyboard = Markup.inlineKeyboard(buttons);
                    const response: BotResponse = {
                        type: TelegramResponseType.Card,
                        text: msg.card!.title ? msg.card!.title : "",
                        buttons: inlineKeyboard,
                    };
                    if (msg.card?.imageUri) {
                        response.image = { url: msg.card?.imageUri };
                    }
                    result.push(response);
                    break;

                case TelegramResponseType.Image:
                    result.push({
                        type: TelegramResponseType.Image,
                        image: {
                            url: msg.image?.imageUri ? msg.image?.imageUri : "",
                        },
                    });
                    break;

                case TelegramResponseType.Payload:
                    // process fulfillment
                    if (msg.payload && msg.payload.fields) {
                        const fulfillment =
                            msg.payload.fields.action.stringValue;
                        if (fulfillment) {
                            console.log(fulfillment);
                            const responses = await fulfillments[fulfillment](
                                this.parameters
                            );
                            if (responses && responses.length) {
                                result = [...result, ...responses];
                            }
                        }
                    }
                    break;
                default:
                    break;
            }
        }

        return result;
    }
}

export default Parser;
