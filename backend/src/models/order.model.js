import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        bookId: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
        ],
        availability: [], // Consider defining the expected data type
        status: {
            type: String,
            enum: ["pending", "confirm", "delivered", "return", "accepted"],
            default: "pending",
        },
        rentalDuration: {
            type: Number,
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        deliveryAddress: {
            type: String,
            required: true,
        },
        riderId: {
            type: String,
        },
        shopkeeperId: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Shopkeeper", // Corrected "Shoopkeeper"
            },
        ],
    }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
