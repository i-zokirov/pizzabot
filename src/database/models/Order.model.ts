import { Schema, model, Types } from "mongoose";

export interface IOrderItem {
    name: string;
    qty: number;
    price: number;
    product: Types.ObjectId;
}

export enum PaymentMethod {
    Online = "Online",
    Cash = "Cash",
}

export enum OrderStatus {
    Placed = "Placed",
    Ready = "Ready",
    Dispatched = "Dispatched",
    Delivered = "Delivered",
}

export interface IOrder {
    _id?: Types.ObjectId;
    user: Types.ObjectId;
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
}

const orderSchema = new Schema<IOrder>({
    user: {
        type: Schema.Types.ObjectId,
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
        enum: ["Online", "Cash"],
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
        enum: ["Placed", "Ready", "Dispatched", "Delivered"],
        default: OrderStatus.Placed,
    },
});
const Order = model<IOrder>("Order", orderSchema);

export default Order;
