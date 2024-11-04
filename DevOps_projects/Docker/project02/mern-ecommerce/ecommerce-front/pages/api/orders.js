import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { createConnections } from "@/lib/mongoose";
import { Orders } from "@/models/orders";

/** endpoint for orders */
export default async function handler(req, res) {
    await createConnections()
    const session = await getServerSession(req, res, authOptions)
    try {

        res.json(await Orders.find({ userEmail: session?.user?.email }))

    } catch (err) {
        console.log("error", err);
    }
}