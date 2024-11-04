import Center from "@/components/center/Center";
import Header from "@/components/header/Header";
import ProductsCards from "@/components/productscards/ProductsCards";
import { createConnections } from "@/lib/mongoose";
import { Category } from "@/models/category";
import { Product } from "@/models/products";
import styled from "styled-components";
import Link from "next/link";
import { RevealWrapper } from "next-reveal"; /** animations */
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { WishedProducts } from "@/models/wishedproduct";
/** styling */
const CategoriesGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    /** media queries for big screen */
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`
const CategoriesTitle = styled.div`
display: flex;
align-items: center;
gap: 15px;
a{
    color: #888;
}
margin-top: 10px;
margin-bottom: 0;
h2{
    margin-bottom: 10px;
    margin-top: 10px;
}
`
const CategoriesWrapper = styled.div`
margin-bottom: 40px;
`
const ShowAllSquare = styled(Link)`
background-color:#ddd;
height: 160px;
border-radius: 10px;
display: flex;
align-items: center;
justify-content: center;
color: #555;
text-decoration: none;
`
export default function CategoriesPage({
    mainCategories,
    categoriesProducts,
    wishedProducts = []
}) {


    return (
        <>
            <Header />
            <Center>
                {
                    mainCategories.length > 0 && mainCategories.map((c) => (
                        <CategoriesWrapper key={c._id}>
                            <CategoriesTitle>
                                <h2>{c.name}</h2>
                                <div>
                                    <Link href={`/category/${c._id}`}>Show all</Link>
                                </div>
                            </CategoriesTitle>
                            <CategoriesGrid>
                                {
                                    categoriesProducts[c._id].length > 0 && categoriesProducts[c._id].map((p, index) => (
                                        <RevealWrapper key={p._id} delay={index * 50}>
                                            <ProductsCards {...p} wished={wishedProducts.includes(p._id)} />
                                        </RevealWrapper>

                                    ))
                                }
                                <RevealWrapper delay={categoriesProducts[c._id].length * 50}>
                                    <ShowAllSquare href={`/category/${c._id}`}>
                                        Show All &rarr;
                                    </ShowAllSquare>
                                </RevealWrapper>
                            </CategoriesGrid>
                        </CategoriesWrapper>
                    ))
                }
            </Center>
        </>
    )
}

export const getServerSideProps = async (context) => {
    await createConnections()
    const categories = await Category.find();
    const mainCategories = categories.filter((c) => !c.parent)
    let categoriesProducts = {}
    const fetchAllProductsId = []

    /** fetch all the categories that matches all the products 
     * with parent category 
     * */
    for (const mainCat of mainCategories) {
        const mainCatId = mainCat._id.toString();
        /**
         * find all the product ids in this cat
         * find all the child categories (sub-categories) */

        const childCatId = categories.filter((c) => c?.parent?.toString() === mainCatId).map((cid) => cid._id?.toString())
        const categoriesIds = [mainCatId, ...childCatId]

        let products = await Product.find({ category: categoriesIds }, null, { limit: 3, sort: { '_id': -1 } })
        fetchAllProductsId.push(...products.map(p => p._id.toString()))
        categoriesProducts[mainCat._id] = products;
    }


    const session = await getServerSession(context.req, context.res, authOptions)

    const wishedProducts = session?.user ? await WishedProducts.find(
        {
            userEmail: session?.user.email,
            product: fetchAllProductsId
        }) : []
    return {
        props: {
            mainCategories: JSON.parse(JSON.stringify(mainCategories)),
            categoriesProducts: JSON.parse(JSON.stringify(categoriesProducts)),
            wishedProducts: wishedProducts.map((ids) => ids.product.toString())
        }
    }
}

