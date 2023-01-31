import dialogflow from "@google-cloud/dialogflow";
import * as protos from "@google-cloud/dialogflow/build/protos/protos";
import { dl_projectId, dl_languageCode } from "../../config";
import { struct, Struct } from "pb-util";
import { DlQueryType, TelegramResponseType } from "../enums";
import Parser from "./Parser";
import { BotResponse, FulfillmentMessage } from "../interfaces";

const client = new dialogflow.SessionsClient();
const contextsStore = new Map();
const detecIntent = async (
    sessionId: string,
    query: string,
    type: DlQueryType,
    params?: protos.google.protobuf.IStruct
) => {
    // The path to identify the agent that owns the created intent.

    const sessionPath = client.projectAgentSessionPath(
        dl_projectId!,
        sessionId
    );

    const textInput = {
        text: {
            text: query,
            languageCode: dl_languageCode,
        },
    };
    const eventInput = {
        event: {
            name: query,
            languageCode: dl_languageCode,
            parameters: params,
        },
    };
    // The text query request.
    const request: protos.google.cloud.dialogflow.v2.IDetectIntentRequest = {
        session: sessionPath,
        queryInput: type === DlQueryType.Text ? textInput : eventInput,
        queryParams: {
            contexts: contextsStore.get(sessionId),
            payload: params,
        },
    };

    if (params) {
        if (
            request.queryParams?.contexts &&
            request.queryParams?.contexts.length
        ) {
            const contextparams = struct.decode(
                request.queryParams?.contexts[0].parameters as Struct
            );
            const customparams = struct.decode(params as Struct);
            const updated = struct.encode({
                ...contextparams,
                ...customparams,
            });
            request.queryParams.contexts[0].parameters =
                updated as protos.google.protobuf.IStruct;
        }
    }

    const responses = await client.detectIntent(request);
    return responses[0];
};

export const executeQuery = async (
    query: string,
    sessionId: string,
    type: DlQueryType,
    params?: protos.google.protobuf.IStruct
) => {
    try {
        const intentResponse = await detecIntent(
            sessionId,
            query,
            type,
            params
        );

        contextsStore.set(
            sessionId,
            intentResponse.queryResult?.outputContexts
        );
        let messages: FulfillmentMessage[];
        if (intentResponse.queryResult!.fulfillmentMessages) {
            messages = intentResponse.queryResult!.fulfillmentMessages?.filter(
                (msg) => msg.platform === "TELEGRAM"
            );
            const parameters = intentResponse.queryResult?.parameters;
            if (messages.length) {
                const parser = new Parser(
                    messages,
                    parameters as Struct | undefined
                );
                const botmessage = parser.parse();
                return botmessage;
            } else {
                if (intentResponse.queryResult!.fulfillmentText) {
                    const botmessages: BotResponse[] = [
                        {
                            type: TelegramResponseType.Text,
                            text: intentResponse.queryResult!.fulfillmentText,
                        },
                    ];
                    return botmessages;
                }
            }
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};
