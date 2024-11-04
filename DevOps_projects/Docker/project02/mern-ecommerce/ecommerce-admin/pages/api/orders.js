import { createConnections } from "@/lib/mongoose";
import { Orders } from "@/models/orders";

export default async function handler(req, res) {
    await createConnections()
    res.json(await Orders.find().sort({ createdAt: -1 }))
}

