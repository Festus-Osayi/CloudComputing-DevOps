import clientPromise from "@/lib/mongodb"
import { createConnections } from "@/lib/mongoose"
import { Product } from "@/models/products"
import { isAdminRequest } from "./auth/[...nextauth]"

export default async function handler(req, res) {
    const { method } = req
    const {
        title,
        description,
        price,
        _id,
        images,
        category,
        properties
    } = req.body
    await createConnections()
    await isAdminRequest(req, res) // validate if the user is admin
    switch (method) {

        case 'GET':
            req.query.id ? res.json(await Product.findOne({ _id: req.query.id })) :
                res.json(await Product.find())
            break;
        case 'POST':
            const productDoc = await Product.create({
                title, description, price, images, category, properties
            })
            res.json(productDoc)
            break;
        case 'PUT':

            await Product.updateOne({ _id }, { title, description, price, _id, images, category, properties })
            res.json(true)
            break;
        case 'DELETE':
            req.query.id ? await Product.deleteOne({ _id: req.query.id }) : res.json(await Product.find())
            res.json(true)
            break;
        default:
            setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
            res.status(500).end(`Method ${method} not allowed`)
            break;

    }
}