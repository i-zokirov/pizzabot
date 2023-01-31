import * as protos from "@google-cloud/dialogflow/build/protos/protos";
import { TelegramResponseType } from "../enums";
import telegraf from "telegraf";
import { InlineKeyboardMarkup } from "telegraf/typings/core/types/typegram";
export interface FulfillmentMessage
    extends protos.google.cloud.dialogflow.v2.Intent.IMessage {
    message?: TelegramResponseType;
}

export interface TelegramUser {
    id: number;
    is_bot: boolean;
    first_name: string;
    last_name: string;
    username: string;
    language_code: string;
}

export interface BotResponse {
    type: TelegramResponseType;
    text?: string;
    image?: { url: string };
    buttons?: telegraf.Markup.Markup<InlineKeyboardMarkup>;
}
