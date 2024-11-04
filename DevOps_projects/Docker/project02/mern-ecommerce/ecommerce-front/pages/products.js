import Center from "@/components/center/Center";
import ProductsGrid from "@/components/reusable-styles/ProductsGrid";
import Header from "@/components/header/Header";
import { createConnections } from "@/lib/mongoose";
import { Product } from "@/models/products";
import { Title } from "@/components/reusable-styles/Title";
import { getServerSession } from "next-auth";
import { WishedProducts } from "@/models/wishedproduct";
import { authOptions } from "./api/auth/[...nextauth]";


export default function ProductsPage({ products, wishedProducts }) {
    return (
        <>
            <Header />
            <Center>
                <Title>All products</Title>
                <ProductsGrid products={products} wishedProducts={wishedProducts} />
            </Center>
        </>
    )
}

export const getServerSideProps = async (context) => {
    // fetch all the data needed for this page and pass it to our props object as a prop called 'products'
    await createConnections()
    const products = await Product.find({}, null, { sort: { '_id': -1 } })
    const session = await getServerSession(context.req, context.res, authOptions)

    const wishedNewProducts = session?.user ? await WishedProducts.find(
        {
            userEmail: session?.user.email,
            product: products.map((p) => p._id.toString())
        }) : []
    return {
        props: {
            products: JSON.parse(JSON.stringify(products)),
            wishedProducts: wishedNewProducts.map((i) => i.product.toString())
        }
    }
}

