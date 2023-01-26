import dialogflow from "@google-cloud/dialogflow";
import * as protos from "@google-cloud/dialogflow/build/protos/protos";
import { dl_projectId, dl_languageCode } from "../../config";

import { DlQueryType } from "../enums";
import Parser from "./Parser";
import { FulfillmentMessage } from "../interfaces";

const client = new dialogflow.SessionsClient();

const detecIntent = async (
    sessionId: string,
    query: string,
    contexts: protos.google.cloud.dialogflow.v2.IContext[],
    type: DlQueryType
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
        },
    };
    // The text query request.
    const request: protos.google.cloud.dialogflow.v2.IDetectIntentRequest = {
        session: sessionPath,
        queryInput: type === DlQueryType.Text ? textInput : eventInput,
        queryParams: {
            contexts: [],
        },
    };

    if (contexts && contexts.length > 0) {
        request.queryParams = {
            contexts: contexts,
        };
    }

    const responses = await client.detectIntent(request);
    return responses[0];
};

export const executeQuery = async (
    query: string,
    sessionId: string,
    type: DlQueryType
) => {
    try {
        let contexts:
            | protos.google.cloud.dialogflow.v2.IContext[]
            | null
            | undefined = [];
        let intentResponse = await detecIntent(
            sessionId,
            query,
            contexts,
            type
        );

        contexts = intentResponse.queryResult?.outputContexts;
        let messages: FulfillmentMessage[];
        if (intentResponse.queryResult!.fulfillmentMessages) {
            messages = intentResponse.queryResult!.fulfillmentMessages?.filter(
                (msg) => msg.platform === "TELEGRAM"
            );
            const parser = new Parser(messages);
            const botmessage = parser.parse();
            return botmessage;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};
