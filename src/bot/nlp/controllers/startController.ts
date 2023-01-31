import { Context, Markup } from "telegraf";
import { TelegramResponseType } from "../../enums";
import { v4 as uuidv4 } from "uuid";
import { executeQuery } from "../dialogflow";
import { DlQueryType } from "../../enums";
import getUser from "../dbfunctions/getUser";
import { TelegramUser } from "../../interfaces";

const keyboard = Markup.keyboard([
    Markup.button.callback("Menu", "open-menu"),
    Markup.button.callback("Buyurtmalarim", "open-orders"),
]);

export async function startController(ctx: Context) {
    console.log(ctx.from);
    const user = await getUser(ctx.from as TelegramUser);
    console.log(user);
    const sessionId = uuidv4();
    sessions.set(ctx.from!.username, sessionId);
    // ctx.replyWithHTML(
    //     'This text is <b>bold</b> \n <i>italic</i> <span class="tg-spoiler" style="color: blue; text-decoration: underline;">styled</span>'
    // );
    ctx.replyWithHTML("simple text");
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
    // const botmessage = await executeQuery(
    //     "TELEGRAM_WELCOME",
    //     sessionId,
    //     DlQueryType.Event
    // );
    // if (botmessage?.length) {
    //     for (let message of botmessage) {
    //         switch (message.type) {
    //             case TelegramResponseType.Text:
    //                 ctx.reply(message.message);
    //                 break;
    //             case TelegramResponseType.Card:
    //                 if (message.image) {
    //                     ctx.replyWithPhoto(message.image, message.buttons);
    //                 } else {
    //                     ctx.sendMessage(message.text, message.buttons);
    //                 }
    //                 break;
    //             default:
    //                 break;
    //         }
    //     }
    // }
}
