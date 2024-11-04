import { createConnections } from "@/lib/mongoose";
import { Settings } from "@/models/settings";

export default async function handler(req, res) {
    await createConnections()
    const { method } = req
    switch (method) {
        case 'GET':
            const { name } = req.query
            const settings = await Settings.findOne({ name })
            if (settings) {
                res.json(settings)
            } else {
                res.status(404).json({ message: 'Settings not found' });
            }

            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
            res.status(401).end(`Method ${method} is not allowed`)
            break;
    }
}