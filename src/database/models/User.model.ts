import { Schema, model, Types } from "mongoose";

export interface IUser {
    _id: number;
    firstName?: string;
    lastName?: string;
    username: string;
}

const userSchema = new Schema<IUser>({
    _id: {
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
