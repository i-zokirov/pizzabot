import { BotResponse } from "../../interfaces";
import openMenu from "./openMenu";
import { Struct } from "pb-util";
import confirmOrder from "./confirmOrder";
const fulfillments: {
    [x: string]: (
        parameters: Struct | undefined
    ) => Promise<BotResponse[] | void>;
} = {
    openmenu: openMenu,
    confirmorder: confirmOrder,
};

export default fulfillments;
