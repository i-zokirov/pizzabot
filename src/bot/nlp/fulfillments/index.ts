import openMenu from "./openMenu";

const fulfillments: { [x: string]: () => void } = {
    openmenu: openMenu,
};

export default fulfillments;
