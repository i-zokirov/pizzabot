import { Context } from "telegraf";
import { TelegramResponseType } from "../../enums";
import { v4 as uuidv4 } from "uuid";
import { executeQuery } from "../dialogflow";
import { CallbackQuery } from "telegraf/typings/core/types/typegram";
import { DlQueryType } from "../../enums";
import { BotResponse } from "../../interfaces";
import * as protos from "@google-cloud/dialogflow/build/protos/protos";
import { struct } from "pb-util";

export async function callbackController(ctx: Context) {
    let callbackEvent = (ctx.callbackQuery! as CallbackQuery.DataQuery).data;
    let params: { [x: string]: any } = {
        chatId: ctx.chat?.id,
        firstName: ctx.from?.first_name,
        lastName: ctx.from?.last_name,
        userId: ctx.from?.id,
    };

    if (callbackEvent.includes(":")) {
        params[callbackEvent.split(":")[1]] = callbackEvent.split(":")[2];
        callbackEvent = callbackEvent.split(":")[0];
    }

    ctx.telegram.sendChatAction(ctx.chat!.id, "typing");
    console.log(`Callback event : ${callbackEvent}`);
    let sessionId;

    if (sessions.get(ctx.from?.username)) {
        sessionId = sessions.get(ctx.from?.username);
    } else {
        sessionId = uuidv4();
        sessions.set(ctx.from?.username, sessionId);
    }
    console.log(`Session ID : ${sessionId}`);
    params.sessionId = sessionId;
    params = struct.encode(params);
    const botResponses: BotResponse[] | undefined = await executeQuery(
        callbackEvent,
        sessionId,
        DlQueryType.Event,
        params as protos.google.protobuf.IStruct
    );
    if (botResponses && botResponses?.length) {
        botResponses.forEach((response, indx) => {
            if (response.type === TelegramResponseType.Text) {
                if (response.text) {
                    ctx.replyWithHTML(response.text!);
                }
            } else if (response.type === TelegramResponseType.Card) {
                if (response.image) {
                    console.log(`image url: ${response.image}`);

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
        });
    }
}
