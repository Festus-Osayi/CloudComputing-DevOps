import { Schema, models, model } from "mongoose";
import { Product } from "@/models/products";

/** model for wish lists */
const WishedSchema = new Schema({
    userEmail: { type: String, required: true },
    product: { type: Schema.Types.ObjectId, ref: Product }
})

export const WishedProducts = models.Wishlist || model('Wishlist', WishedSchema)