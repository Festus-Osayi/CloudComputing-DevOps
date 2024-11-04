import { createConnections } from "@/lib/mongoose"
import { getServerSession } from "next-auth"
import { authOptions } from "./auth/[...nextauth]"
import { WishedProducts } from "@/models/wishedproduct"

/** wishlist endpoint */
export default async function handler(req, res) {
    await createConnections()

    const session = await getServerSession(req, res, authOptions)
    const { method } = req

    switch (method) {
        case 'POST':
            try {
                const { product } = req.body
                const wishDoc = await WishedProducts.findOne({ userEmail: session?.user.email, product })
                if (wishDoc) {
                    await WishedProducts.findByIdAndDelete(wishDoc._id)
                    res.json(`Product removed from your wishlist`)
                } else {
                    await WishedProducts.create({
                        userEmail: session?.user.email,
                        product
                    })
                    res.json(`Product added to your wishlist`)
                }
            }
            catch (err) {
                console.log('error in post request', err);
            }

            break;
        case 'GET':
            try {
                res.json(await WishedProducts.find({ userEmail: session?.user.email }).populate('product'))

            }
            catch (err) {
                console.log('Error in GET /api/wishlist', err)
            }
            break;

        default:
            res.status(401).send(`Method ${method} not allowed`)
            break;

    }

}