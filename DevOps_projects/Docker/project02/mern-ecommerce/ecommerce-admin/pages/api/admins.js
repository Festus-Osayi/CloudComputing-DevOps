import { createConnections } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";
import { Admin } from "@/models/admin";

/** endpoint for admins */
export default async function handler(req, res) {
    await createConnections()
    await isAdminRequest(req, res)
    const { method } = req
    switch (method) {
        case 'POST':
            const { email } = req.body
            if (await Admin.findOne({ email })){
                res.status(400).json({message: `${email} already exist`})
            }else{
                res.json(await Admin.create({ email }))
            }
            break;
        case 'GET':
            res.json(await Admin.find())
            break;
        case 'DELETE':
            const { _id } = req.query
            await Admin.findByIdAndDelete(_id)
            res.json('ok')
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']).end(`Method ${method} is not allowed`)
            break;

    }

}