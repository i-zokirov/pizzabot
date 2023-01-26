export default async function openMenu() {
    await new Promise<void>((resolve) => {
        setTimeout(() => {
            console.log("Open menu fulfillment");
            resolve();
        }, 1);
    });
}
