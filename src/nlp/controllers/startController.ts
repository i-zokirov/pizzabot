import { Context } from "telegraf";
import { TelegramResponseType } from "../../enums";
import { v4 as uuidv4 } from "uuid";
import { executeQuery } from "../dialogflow";
import { DlQueryType } from "../../enums";

export async function startController(ctx: Context) {
    console.log(ctx.from);
    const sessionId = uuidv4();
    sessions.set(ctx.from!.username, sessionId);
    const botmessage = await executeQuery(
        "TELEGRAM_WELCOME",
        sessionId,
        DlQueryType.Event
    );
    if (botmessage?.length) {
        for (let message of botmessage) {
            switch (message.type) {
                case TelegramResponseType.Text:
                    ctx.reply(message.message);
                    break;
                case TelegramResponseType.Card:
                    if (message.image) {
                        ctx.replyWithPhoto(message.image, message.buttons);
                    } else {
                        ctx.sendMessage(message.text, message.buttons);
                    }
                    break;
                default:
                    break;
            }
        }
    }
}
