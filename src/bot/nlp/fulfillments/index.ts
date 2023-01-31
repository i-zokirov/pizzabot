import { BotResponse } from "../../interfaces";
import openMenu from "./actions/openMenu";
import { Struct } from "pb-util";
import registerOrder from "./actions/registerOrder";
import confirmOrder from "./actions/confirmOrder";
const fulfillments: {
    [x: string]: (
        parameters: Struct | undefined
    ) => Promise<BotResponse[] | void>;
} = {
    openmenu: openMenu,
    registerorder: registerOrder,
    orderconfirmed: confirmOrder,
};

export default fulfillments;
