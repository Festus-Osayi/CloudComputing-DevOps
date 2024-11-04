const { Schema, model, models } = require("mongoose");

const OrderSchema = new Schema({
    line_items: Object,
    name: String,
    email: String,
    city: String,
    postalCode: String,
    streetAddress: String,
    province: String,
    country: String,
    isPaid: Boolean,
}, { timestamps: true })

export const Orders = models?.Order || model('Order', OrderSchema)