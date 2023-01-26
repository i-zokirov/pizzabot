import { Telegraf } from "telegraf";
import { message, callbackQuery } from "telegraf/filters";
import { BOT_TOKEN } from "../config";
import { handleMessage } from "./nlp/controllers/messageController";
import { callbackController } from "./nlp/controllers/callbackController";
import { startController } from "./nlp/controllers/startController";

const bot = new Telegraf(BOT_TOKEN!);

declare global {
    var sessions: Map<any, any>;
}
global.sessions = new Map();

bot.start(startController);
bot.on(message("text"), handleMessage);
bot.on(callbackQuery("data"), callbackController);

bot.settings(async (ctx) => {
    await ctx.telegram.setMyCommands([
        {
            command: "/foo",
            description: "foo description",
        },
        {
            command: "/bar",
            description: "bar description",
        },
        {
            command: "/baz",
            description: "baz description",
        },
    ]);
    return ctx.reply("Ok");
});

bot.help(async (ctx) => {
    const commands = await ctx.getMyCommands();
    const info = commands.reduce(
        (acc, val) => `${acc}/${val.command} - ${val.description}\n`,
        ""
    );
    return ctx.reply(info);
});

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

export default bot;
bot.launch();
