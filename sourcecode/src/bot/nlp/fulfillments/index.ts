import { BotResponse } from "../../interfaces";
import openMenu from "./actions/openMenu";
import { Struct } from "pb-util";
import registerOrder from "./actions/registerOrder";
import confirmOrder from "./actions/confirmOrder";
import rejectOrder from "./actions/rejectOrder";
import checkOrderStatus from "./actions/checkOrderStatus";

const fulfillments: {
    [x: string]: (
        parameters: Struct | undefined
    ) => Promise<BotResponse[] | void>;
} = {
    openmenu: openMenu,
    registerorder: registerOrder,
    orderconfirmed: confirmOrder,
    rejectorder: rejectOrder,
    checkorderstatus: checkOrderStatus,
};

export default fulfillments;
