import { createConnections } from "@/lib/mongoose";
import { Product } from "@/models/products";

/** endpoints for category */
export default async function products(req, res) {

    await createConnections();
    const { categories, phrase, sort, ...otherFilter } = req.query
    const [sortField, sortOrder] = (sort || '_id-desc').split('-')
    const productQuery = {}
    if (categories) {
        productQuery.category = categories.split(',')
    }

    if (phrase) {
        productQuery['$or'] = [{
            title: { $regex: phrase, $options: 'i' },
            description: { $regex: phrase, $options: 'i' }
        }]
    }

    /** check if the filter object is 0
     * loop through all key of the (otherFilter)
     * set the property name, to the filters name
     */
    if (Object.keys(otherFilter).length > 0) {

        Object.keys(otherFilter).forEach((filterName) => {
            productQuery[`properties.${filterName}`] = otherFilter[filterName]
        })
    }
    
    return res.json(await Product.find(productQuery, null, { sort: { [sortField]: sortOrder === 'asc' ? 1 : -1 } }))
}

