import { Schema, model, Types } from "mongoose";

export interface IUser {
    _id?: Types.ObjectId;
    firstName?: string;
    lastName?: string;
    username: string;
    telegramId: number;
}

const userSchema = new Schema<IUser>({
    telegramId: {
        type: Number,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
});
const User = model<IUser>("User", userSchema);

export default User;
