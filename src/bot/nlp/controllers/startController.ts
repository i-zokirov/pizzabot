import { Context, Markup } from "telegraf";
import { TelegramResponseType } from "../../enums";
import { v4 as uuidv4 } from "uuid";
import { executeQuery } from "../dialogflow";
import { DlQueryType } from "../../enums";
import getUser from "../dbfunctions/getUser";
import { TelegramUser } from "../../interfaces";

// const keyboard = Markup.keyboard([
//     Markup.button.callback("Menu", "open-menu"),
//     Markup.button.callback("Buyurtmalarim", "open-orders"),
// ]);

// const keyboard = Markup.keyboard(["/menu", "/buyurtmalarim"])
//     .oneTime()
//     .resize();

export async function startController(ctx: Context) {
    ctx.telegram.sendChatAction(ctx.chat!.id, "typing");
    console.log(ctx.from);
    const user = await getUser(ctx.from as TelegramUser);
    console.log(user);
    const sessionId = uuidv4();
    sessions.set(ctx.from!.username, sessionId);

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
    if (botResponses && botResponses?.length) {
        botResponses.forEach(async (response, indx) => {
            setTimeout(() => {
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
                            ctx.replyWithHTML(response.text, response.buttons);
                    }
                }
                ctx.telegram.sendChatAction(ctx.chat!.id, "typing");
            }, 300 * indx);
        });
    }
}
