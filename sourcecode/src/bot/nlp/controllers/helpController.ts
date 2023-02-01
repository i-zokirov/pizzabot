import { Context } from "telegraf";
import { executeQuery } from "../dialogflow";
import { DlQueryType } from "../../enums";
import getUser from "../dbfunctions/getUser";
import { TelegramUser } from "../../interfaces";
import manageUserSession from "../../core/manageUserSession";
import sendBotResponses from "../../core/sendBotResponses";

export async function helpController(ctx: Context) {
    ctx.telegram.sendChatAction(ctx.chat!.id, "typing");
    const user = await getUser(ctx.from as TelegramUser);
    let sessionId = manageUserSession(ctx.from!.username as string);
    console.log(`Session ID : ${sessionId}`);

    const botResponses = await executeQuery(
        "help",
        sessionId,
        DlQueryType.Event
    );
    sendBotResponses(ctx, botResponses);
}
