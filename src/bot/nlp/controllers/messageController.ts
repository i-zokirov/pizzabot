import { Context } from "telegraf";
import { TelegramResponseType } from "../../enums";
import { v4 as uuidv4 } from "uuid";
import { executeQuery } from "../dialogflow";
import { Message } from "telegraf/typings/core/types/typegram";
import { DlQueryType } from "../../enums";

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
            const botmessage = await executeQuery(
                userInput,
                sessionId,
                DlQueryType.Text
            );

            console.log(botmessage);
            if (botmessage?.length) {
                for (let i = 0; i < botmessage.length; i++) {
                    setTimeout(() => {
                        ctx.telegram.sendChatAction(ctx.chat!.id, "typing");
                        setTimeout(() => {
                            ctx.telegram.sendChatAction(ctx.chat!.id, "typing");
                            if (
                                botmessage[i].type === TelegramResponseType.Text
                            ) {
                                ctx.reply(botmessage[i].message);
                            } else if (
                                botmessage[i].type === TelegramResponseType.Card
                            ) {
                                if (botmessage[i].image) {
                                    console.log(
                                        `image url: ${botmessage[i].image}`
                                    );
                                    ctx.replyWithPhoto(
                                        {
                                            url: botmessage[i].image,
                                        },
                                        {
                                            caption: botmessage[i].text,
                                            parse_mode: "Markdown",
                                            ...botmessage[i].buttons,
                                        }
                                    );
                                } else {
                                    ctx.sendMessage(
                                        botmessage[i].text,
                                        botmessage[i].buttons
                                    );
                                }
                            }
                        }, 1000 * i);
                    }, 500 * i);
                }
            }
        }
    } catch (error) {
        console.log(error);
        ctx.reply("Error occured");
    }
}
