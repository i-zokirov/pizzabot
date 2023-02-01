import { Context } from "telegraf";
import { executeQuery } from "../dialogflow";
import { Message } from "telegraf/typings/core/types/typegram";
import { DlQueryType } from "../../enums";
import { BotResponse } from "../../interfaces/index";
import manageUserSession from "../../core/manageUserSession";
import sendBotResponses from "../../core/sendBotResponses";

export async function handleMessage(ctx: Context) {
    try {
        if (ctx) {
            const userInput = (ctx.message as Message.TextMessage).text;
            console.log(`User input : ${userInput}`);
            const sessionId = manageUserSession(ctx.from?.username as string);
            ctx.telegram.sendChatAction(ctx.chat!.id, "typing");
            const botResponses: BotResponse[] | undefined = await executeQuery(
                userInput,
                sessionId,
                DlQueryType.Text
            );
            sendBotResponses(ctx, botResponses);
        }
    } catch (error) {
        console.log(error);
        ctx.reply("Error occured");
    }
}
