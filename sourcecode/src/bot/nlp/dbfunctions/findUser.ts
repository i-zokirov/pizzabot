import User from "../../../database/models/User.model";

export default async function findUser(userId: string) {
    try {
        const user = await User.findOne({ telegramId: userId });
        if (user) {
            return user;
        }
    } catch (error) {
        console.error(`Error in getting user`);
        console.error(error);
    }
}
