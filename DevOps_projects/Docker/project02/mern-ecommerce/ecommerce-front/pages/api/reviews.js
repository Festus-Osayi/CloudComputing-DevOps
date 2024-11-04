import { createConnections } from "@/lib/mongoose";
import { Review } from "@/models/reviews";

export default async function handler(req, res) {
    /** connect to the database */
    await createConnections()
    const { method } = req
    switch (method) {
        case 'POST':
            const { title, description, stars, product } = req.body
            res.status(200).json(await Review.create({ title, description, stars, product }));
            break;

        case 'GET':
            res.status(200).json(await Review.find({ product: req.query.product }))
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(401).end(`Method ${method} is not allowed`)
            break;
    }
}