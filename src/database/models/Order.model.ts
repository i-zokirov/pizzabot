import { Schema, model, Types } from "mongoose";

export interface IOrderItem {
    name?: string;
    qty: number;
    price: number;
    product: Types.ObjectId;
}

export enum PaymentMethod {
    Online = "Online",
    Cash = "Naqt pul",
}

export enum OrderStatus {
    Placed = "Qabul qilindi",
    Ready = "Tayyor",
    Dispatched = "Yuborildi",
    Delivered = "Yetkizib berildi",
}

export interface IOrder {
    _id?: Types.ObjectId;
    user: number;
    orderItems: IOrderItem[];
    orderItemsPrice: number;
    shippingPrice: number;
    totalPrice: number;
    paymentMethod: PaymentMethod;
    isPaid: boolean;
    paidOn?: Date;
    isDelivered: boolean;
    daliveredOn?: Date;
    status: OrderStatus;
    chatId: number;
    userConfirmed: boolean;
}

const orderSchema = new Schema<IOrder>({
    user: {
        type: Number,
        required: true,
        ref: "User",
    },
    orderItems: [
        {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            price: { type: Number, required: true },
            product: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: "Product",
            },
        },
    ],
    orderItemsPrice: {
        type: Number,
        required: true,
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ["Online", "Naqt pul"],
        default: PaymentMethod.Cash,
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    },
    paidOn: {
        type: Date,
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false,
    },
    daliveredOn: {
        type: Date,
    },
    status: {
        type: String,
        required: true,
        enum: ["Qabul qilindi", "Tayyor", "Yuborildi", "Yetkizib berildi"],
        default: OrderStatus.Placed,
    },
    chatId: Number,
    userConfirmed: {
        type: Boolean,
        required: true,
        default: false,
    },
});
const Order = model<IOrder>("Order", orderSchema);

export default Order;
