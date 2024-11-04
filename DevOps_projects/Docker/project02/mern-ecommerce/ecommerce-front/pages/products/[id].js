import { Title } from "@/components/reusable-styles/Title";
import Center from "@/components/center/Center";
import Header from "@/components/header/Header";
import { createConnections } from "@/lib/mongoose";
import { Product } from "@/models/products";
import styled from "styled-components";
import { WhiteBox } from "@/components/reusable-styles/WhiteBox";
import ProductImage from "@/components/productimages/ProductImage";
import Buttons from "@/components/buttons/Buttons";
import CartIcons from "@/components/icons/CartIcons";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import FlyingButton from "@/components/reusable-styles/FlyingButton";
import ProductsReviews from "@/components/productsreviews/ProductsReviews";
import { formatPrice } from "@/lib/date";


const ColWrapper = styled.div`
display: grid;
grid-template-columns: 1fr;
gap: 40px;
margin: 40px 0;
/** media queries for bigger screen */
  @media screen and (min-width: 768px) {
    grid-template-columns: .8fr 1.2fr;
  }
`

const PriceRow = styled.div`
display: flex;
gap: 15px;
align-items: center;
`
const Price = styled.span`
font-size: 1.4rem;
`

export default function Products({ products }) {

    return (
        <>
            <Header />
            <Center>
                <ColWrapper>
                    <WhiteBox>
                        <ProductImage images={products.images} description={products.title} />
                    </WhiteBox>
                    <div>
                        <Title>{products.title}</Title>
                        {products.description}
                        <PriceRow>
                            <div>
                                <Price>
                                    {formatPrice(products.price)}
                                </Price>
                            </div>
                            <div>
                                <FlyingButton main src={products.images[0]} _id={products._id}>
                                    <CartIcons />
                                    Add to cart
                                </FlyingButton>
                            </div>
                        </PriceRow>
                    </div>
                </ColWrapper>
                <ProductsReviews products={products} />
            </Center>
        </>
    )
}

export const getServerSideProps = async (context) => {
    /** get a product of a specific Id */

    await createConnections()
    const { id } = context.query
    const products = await Product.findById(id)
    return {
        props: {
            products: JSON.parse(JSON.stringify(products))
        }
    }
}

