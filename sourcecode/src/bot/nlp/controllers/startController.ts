import { Context } from "telegraf";
import { executeQuery } from "../dialogflow";
import { DlQueryType } from "../../enums";
import getUser from "../dbfunctions/getUser";
import { TelegramUser } from "../../interfaces";
import manageUserSession from "../../core/manageUserSession";
import sendBotResponses from "../../core/sendBotResponses";

// const keyboard = Markup.keyboard([
//     Markup.button.callback("Menu", "open-menu"),
//     Markup.button.callback("Buyurtmalarim", "open-orders"),
// ]);

// const keyboard = Markup.keyboard(["/menu", "/buyurtmalarim"])
//     .oneTime()
//     .resize();

export async function startController(ctx: Context) {
    ctx.telegram.sendChatAction(ctx.chat!.id, "typing");
    const user = await getUser(ctx.from as TelegramUser);
    const sessionId = manageUserSession(ctx.from?.username as string);
    // ctx.replyWithHTML(
    //     'This text is <b>bold</b> \n <i>italic</i> <span class="tg-spoiler" style="color: blue; text-decoration: underline;">styled</span>'
    // );
    // ctx.replyWithHTML("simple text");
    // ctx.replyWithHTML(
    //     `This is an example of <code>const keyboard = Markup.keyboard([
    //     Markup.button.callback("Menu", "open-menu"),
    //     Markup.button.callback("Buyurtmalarim", "open-orders"),
    // ]);</code> formatting`
    // );
    // ctx.replyWithHTML(`<pre>This text will be preformatted</pre>`);
    // ctx.replyWithHTML(`This text is <s>struck through</s>`);
    // ctx.replyWithHTML(`This text is <del>deleted</del>`);
    // ctx.replyWithHTML(`This text is <ins>inserted</ins>`);

    // ctx.sendMessage("Menu", keyboard);
    const botResponses = await executeQuery(
        "TELEGRAM_WELCOME",
        sessionId,
        DlQueryType.Event
    );
    sendBotResponses(ctx, botResponses);
}
