import { Context } from "telegraf";
import { TelegramResponseType } from "../../enums";
import { v4 as uuidv4 } from "uuid";
import { executeQuery } from "../dialogflow";
import { Message } from "telegraf/typings/core/types/typegram";
import { DlQueryType } from "../../enums";
import { BotResponse } from "../../interfaces/index";

export async function handleMessage(ctx: Context) {
    try {
        if (ctx) {
            const userInput = (ctx.message as Message.TextMessage).text;
            console.log(`User input : ${userInput}`);
            let sessionId;

            if (sessions.get(ctx.from!.username)) {
                sessionId = sessions.get(ctx.from!.username);
            } else {
                sessionId = uuidv4();
                sessions.set(ctx.from!.username, sessionId);
            }
            console.log(`Session ID : ${sessionId}`);
            ctx.telegram.sendChatAction(ctx.chat!.id, "typing");
            const botResponses: BotResponse[] | undefined = await executeQuery(
                userInput,
                sessionId,
                DlQueryType.Text
            );

            console.log(botResponses);

            if (botResponses && botResponses?.length) {
                botResponses.forEach((response, indx) => {
                    if (response.type === TelegramResponseType.Text) {
                        if (response.text) {
                            ctx.replyWithHTML(response.text);
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
                                ctx.replyWithHTML(
                                    response.text,
                                    response.buttons
                                );
                        }
                    }
                });
            }
        }
    } catch (error) {
        console.log(error);
        ctx.reply("Error occured");
    }
}
