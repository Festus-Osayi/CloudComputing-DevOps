import { createConnections } from "@/lib/mongoose";
import { Product } from "@/models/products";

/** carts endpoints */
export default async function handler(req, res) {
    await createConnections();

    if (req.method === 'POST') {
        const ids = await req.body.ids;
        
        try {
            if (ids) {
                const products = await Product.find({ _id: ids });
                res.json(products);
                
            } else {
                console.log('unable to find ids')
            }

        } catch (error) {

            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(404).json({ error: 'Invalid Request: Missing IDs' });
        
    }
}
