import User from "../../../database/models/User.model";
import { TelegramUser } from "../../interfaces";
export default async function getUser(tguser: TelegramUser) {
    try {
        const user = await User.findOne({ telegramId: tguser.id });
        if (user) {
            return user;
        }
        const newuser = await User.create({
            firstName: tguser.first_name,
            lastName: tguser.last_name,
            username: tguser.username,
            telegramId: tguser.id,
        });

        if (newuser) return newuser;
    } catch (error) {
        console.error(`Error in getting user`);
        console.error(error);
    }
}
