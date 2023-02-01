import { Telegraf } from "telegraf";
import { message, callbackQuery } from "telegraf/filters";
import { BOT_TOKEN } from "../config";
import { handleMessage } from "./nlp/controllers/messageController";
import { callbackController } from "./nlp/controllers/callbackController";
import { startController } from "./nlp/controllers/startController";
import { ordersController } from "./nlp/controllers/ordersController";
import { menuController } from "./nlp/controllers/menuController";

const bot = new Telegraf(BOT_TOKEN!);

declare global {
    var sessions: Map<any, any>;
}
global.sessions = new Map();

bot.use(Telegraf.log());

bot.start(startController);
bot.command("buyurtmalarim", ordersController);
bot.command("menu", menuController);
bot.on(message("text"), handleMessage);
bot.on(callbackQuery("data"), callbackController);

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

export default bot;
bot.launch();
