import { Context } from "telegraf";
import { TelegramResponseType } from "../../enums";
import { v4 as uuidv4 } from "uuid";
import { executeQuery } from "../dialogflow";
import { CallbackQuery } from "telegraf/typings/core/types/typegram";
import { DlQueryType } from "../../enums";

export async function callbackController(ctx: Context) {
    const callbackEvent = (ctx.callbackQuery! as CallbackQuery.DataQuery).data;
    console.log(`Callback event : ${callbackEvent}`);
    let sessionId;

    if (sessions.get(ctx.from?.username)) {
        sessionId = sessions.get(ctx.from?.username);
    } else {
        sessionId = uuidv4();
        sessions.set(ctx.from?.username, sessionId);
    }
    console.log(`Session ID : ${sessionId}`);
    const botmessage = await executeQuery(
        callbackEvent,
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
