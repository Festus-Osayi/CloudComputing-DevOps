import { createConnections } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";
import { Settings } from "@/models/settings";

/** endpoints for settings */
export default async function handler(req, res) {
    await createConnections()
    await isAdminRequest(req, res)
    const { method } = req
    if (method === 'PUT') {
        const { name, value } = req.body
        /** check if the name already exist in the database */
        const settingsDoc = await Settings.findOne({ name })
        if (settingsDoc) {
            settingsDoc.value = value
            await settingsDoc.save()
            res.json(settingsDoc)
        } else {
            res.json(await Settings.create({ name, value }))
        }
    }

    if (method === 'GET') {
        const { name } = req.query
        res.json(await Settings.findOne({ name }))
    }




}


