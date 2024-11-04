import { Category } from "@/models/category";
import { createConnections } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";


/** end points for categories */
export default async function handle(req, res) {
    const { method } = req;
    await createConnections();
    await isAdminRequest(req, res) // validate if the user is admin
    const { name, parentCategory, _id, properties } = req.body;
    switch (method) {
        case 'GET':
            /** populate the table with the category and the parent */
            res.json(await Category.find().populate('parent'));
            break;
        case 'POST':
            const categoryDoc = await Category.create({
                name, parent: parentCategory || undefined, properties

            });
            res.json(categoryDoc);
            break;
        case 'PUT':
            // TODO update a single document
            const updateDoc = await Category.updateOne({ _id }, { name, parent: parentCategory || undefined, properties })
            res.json(updateDoc)
            break;
        case 'DELETE':
            await Category.deleteOne({ _id: req.query._id })
            res.json('ok');
            break;
        default:
            setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
            res.status(500).end(`Method ${method} not allowed`)
            break;
    }



}