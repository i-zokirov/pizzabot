import User from "../../../database/models/User.model";
import { TelegramUser } from "../../interfaces";
export default async function getUser(tguser: TelegramUser) {
    try {
        const user = await User.findById(tguser.id);
        if (user) {
            return user;
        }
        const newuser = await User.create({
            _id: tguser.id,
            firstName: tguser.first_name,
            lastName: tguser.last_name,
            username: tguser.username,
        });

        if (newuser) return newuser;
    } catch (error) {
        console.error(`Error in getting user`);
        console.error(error);
    }
}
