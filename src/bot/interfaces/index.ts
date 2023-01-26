import * as protos from "@google-cloud/dialogflow/build/protos/protos";
import { TelegramResponseType } from "../enums";

export interface FulfillmentMessage
    extends protos.google.cloud.dialogflow.v2.Intent.IMessage {
    message?: TelegramResponseType;
}
