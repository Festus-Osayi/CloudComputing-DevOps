import { createConnections } from "@/lib/mongoose"
import { Address } from "@/models/address"
import { getServerSession } from 'next-auth'
import { authOptions } from "./auth/[...nextauth]"

export default async function handler(req, res) {
    /** create the database connection */
    try {
        await createConnections();
        const session = await getServerSession(req, res, authOptions);
        const address = await Address.findOne({ userEmail: session?.user?.email });

        if (req.method === 'PUT') {
            let updateAddress;
            if (address) {
                updateAddress = await Address.findByIdAndUpdate(address._id, req.body);
            } else {
                updateAddress = await Address.create({ userEmail: session?.user?.email, ...req.body });
            }

            res.status(200).json(updateAddress);
        }

        if (req.method === "GET") {
            res.json(address);
        }
    } catch (error) {
        console.error("Error in address route:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }



}




