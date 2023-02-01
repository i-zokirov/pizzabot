import { Context } from "telegraf";
import { executeQuery } from "../dialogflow";
import { CallbackQuery } from "telegraf/typings/core/types/typegram";
import { DlQueryType } from "../../enums";
import { BotResponse } from "../../interfaces";
import * as protos from "@google-cloud/dialogflow/build/protos/protos";
import { struct } from "pb-util";
import manageUserSession from "../../core/manageUserSession";
import sendBotResponses from "../../core/sendBotResponses";

export async function callbackController(ctx: Context) {
    let callbackEvent = (ctx.callbackQuery! as CallbackQuery.DataQuery).data;
    let params: { [x: string]: any } = {
        chatId: ctx.chat?.id,
        firstName: ctx.from?.first_name,
        lastName: ctx.from?.last_name,
        userId: ctx.from?.id,
    };

    if (callbackEvent.includes(":")) {
        params[callbackEvent.split(":")[1]] = callbackEvent.split(":")[2];
        callbackEvent = callbackEvent.split(":")[0];
    }

    ctx.telegram.sendChatAction(ctx.chat!.id, "typing");
    console.log(`Callback event : ${callbackEvent}`);
    const sessionId = manageUserSession(ctx.from?.username as string);
    console.log(`Session ID : ${sessionId}`);
    params.sessionId = sessionId;
    params = struct.encode(params);
    const botResponses: BotResponse[] | undefined = await executeQuery(
        callbackEvent,
        sessionId,
        DlQueryType.Event,
        params as protos.google.protobuf.IStruct
    );
    sendBotResponses(ctx, botResponses);
}
