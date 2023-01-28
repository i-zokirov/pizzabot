import * as protos from "@google-cloud/dialogflow/build/protos/protos";
import { TelegramResponseType } from "../enums";

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
