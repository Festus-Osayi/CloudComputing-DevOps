import Buttons from "@/components/buttons/Buttons";
import Center from "@/components/center/Center";
import Header from "@/components/header/Header";
import { CartContext } from "@/context/CartContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Table from "@/components/table/Table";
import Input from "@/components/input/Input";
import { Title } from "@/components/reusable-styles/Title";
import { WhiteBox } from "@/components/reusable-styles/WhiteBox";
import { RevealWrapper } from "next-reveal";
import { useSession } from "next-auth/react";
import Spinner from "@/components/spinner/Spinner";
import { set } from "lodash";
import { formatPrice } from "@/lib/date";



const ColumnWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 40px;
    margin: 40px 0;

    table thead tr th:nth-child(3),
    table tbody tr td:nth-child(3),
    table tbody tr.subtotal td:nth-child(2)
    {
        text-align: right;
    }

     table tr.subtotal td{
        padding: 10px 0;
     }

     table tr.subtotal td:nth-child(2){
        font-size: 1.4rem;
     }
     tr.total td{
        font-weight: bold;
     }
    
    /** media queries for bigger screen */
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.3fr .7fr
  }
`


const Images = styled.img`
    max-width: 60px;
    max-height: 60px;
      /** media queries for bigger screen */
  @media screen and (min-width: 768px) {
    max-width: 80px;
    max-height: 80px;
  }
`
const CartInfoCell = styled.td`
    padding: 10px 0;
`
/** image box */
const ProductImageBox = styled.div`
width: 70px;
height: 100px;
padding: 2px;
border-radius: 10px;
border: 1px solid rgba(0, 0, 0, 0.1);
display: flex;
align-items: center;
justify-content: center;

  /** media queries for bigger screen */
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px
  }

`
const QuantityLabel = styled.span`
display: block;
padding: 0 15px;
  /** media queries for bigger screen */
  @media screen and (min-width: 768px) {
    display: inline;
    padding: 0 10px;
  }
`
export const CityPostalCode = styled.div`
display: flex;
gap: 5px;
`

export default function Cart() {
    /*************  application states ************/
    const { cartProducts, addToProducts, removeProducts, clearCart } = useContext(CartContext)
    const [products, setProducts] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [streetAddress, setStreetAddress] = useState('')
    const [province, setProvince] = useState('')
    const [country, setCountry] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)
    const [shippingFee, setShippingFee] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { data: session } = useSession()
    /*********************************************/
    useEffect(() => {
        setIsLoading(true)
        if (cartProducts && cartProducts.length > 0) {
            axios.post('/api/cart', { ids: cartProducts }).then((res) => {
                setProducts(res.data)
                setIsLoading(false)
            }).catch((err) => {
                setIsLoading(false)
                console.error('Error fetching cart products:', err)

            })

        } else {
            setIsLoading(false)
            setProducts([])
            
        }

    }, [cartProducts])



    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
        if (window?.location.href.includes('success')) {
            setIsSuccess(true);
            clearCart();
        }

        axios.get('/api/settings?name=shippingFee').then((res) => (
            setShippingFee(res.data.value)
        ))

    }, []);

    /**sessions*/
    useEffect(() => {
        /** check to see if the user is logged in or not*/
        if (!session) {
            return;
        }
        /** get the endpoint from (api/address) 
         * prefill the form in the cart page with
         * the data returned
         */
        setIsLoading(true)
        axios.get('/api/address').then((res) => {
            setName(res.data.name)
            setEmail(res.data.email)
            setCity(res.data.city)
            setPostalCode(res.data.postalCode)
            setStreetAddress(res.data.streetAddress)
            setProvince(res.data.province)
            setCountry(res.data.country)
            setIsLoading(false)

        })
    }, [session])
    /** functionality to add more products */
    const moreOfThisProduct = (id) => {
        addToProducts(id)
    }
    /** functionality to remove product */
    const lessOfThisProduct = (id) => {
        removeProducts(id)
    }

    /** a function that make a request to checkout, 
    * and also redirect the user 
    * to the stripe url 
    * */
    async function goToPayment() {
        // get all data from inputs
        const data = { name, email, city, postalCode, streetAddress, province, country, cartProducts }
        const res = await axios.post('/api/checkout', data)
        if (res.data.url) {
            window.location = res.data.url

        }
    }

    /** calculating the total price 
     * @param total
    */
    let productsTotal = 0;
    for (const productId of cartProducts) {
        const price = products.find((p) => p._id === productId)?.price || 0
        productsTotal += price
    }

    /** check if the global window includes a success message */
    if (isSuccess) {
        return (
            <>
                <Header />
                <Center>
                    <ColumnWrapper>
                        <WhiteBox>
                            <h2>Thanks for your order</h2>
                            <p>You will be notified when your order is being delivered.</p>
                        </WhiteBox>
                    </ColumnWrapper>
                </Center>
            </>
        )
    }

    return (
        <>
            <Header />
            <Center>
                <ColumnWrapper>
                    <RevealWrapper delay={0}>
                        <WhiteBox>
                            <Title>Cart</Title>
                            {isLoading && <Spinner fullWidth={true} />}
                            {
                                 cartProducts.length === 0 &&
                                <h2>Your cart is empty</h2>
                            }

                            {/* cart items tables */}
                            {
                                !isLoading && products.length > 0 && (
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                products.map((p) => (
                                                    /** map through all the 
                                                     * products in the carts and 
                                                     * render them in the table cell
                                                     * 
                                                    */
                                                    <tr key={p._id}>
                                                        <CartInfoCell>
                                                            <ProductImageBox>
                                                                <Images src={p.images[0]} alt={p.title} />
                                                            </ProductImageBox>
                                                            {p.title}
                                                        </CartInfoCell>
                                                        <td>
                                                            <Buttons onClick={() => lessOfThisProduct(p._id)}>-</Buttons>
                                                            <QuantityLabel>
                                                                {cartProducts.filter(id => id === p._id).length}
                                                            </QuantityLabel>
                                                            <Buttons onClick={() => moreOfThisProduct(p._id)}>+</Buttons>
                                                        </td>
                                                        <td>{formatPrice(cartProducts.filter(id => id === p._id).length * p.price)}</td>
                                                    </tr>

                                                ))
                                            }
                                            <tr className="subtotal">
                                                <td colSpan={2}>Products</td>
                                                <td>{formatPrice(productsTotal)}</td>
                                            </tr>
                                            <tr className="subtotal">
                                                <td colSpan={2}>Shipping</td>
                                                <td colSpan={2}>{formatPrice(shippingFee)}</td>
                                            </tr>
                                            <tr className="subtotal total">
                                                <td colSpan={2}>Total</td>
                                                <td>{formatPrice(productsTotal + parseInt(shippingFee))}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                )


                            }

                        </WhiteBox>
                    </RevealWrapper>


                    {
                        !!cartProducts?.length > 0 &&
                        <RevealWrapper delay={100}>
                            <WhiteBox>
                                <h2>Order Information</h2>
                                {/* shipping info and stripe payment action*/}
                                {isLoading && <Spinner fullWidth={true}/>}
                                {!isLoading && (
                                    <>
                                        <Input type="text"
                                            placeholder="Name"
                                            value={name}
                                            name='name'
                                            onChange={(e) => setName(e.target.value)} />
                                        <Input type="email"
                                            placeholder="Email"
                                            value={email}
                                            name='email'
                                            onChange={(e) => setEmail(e.target.value)} />
                                        <CityPostalCode>
                                            <Input type="text"
                                                placeholder="City"
                                                value={city}
                                                name='city'
                                                onChange={(e) => setCity(e.target.value)} />
                                            <Input type="text"
                                                placeholder="Postal code"
                                                value={postalCode}
                                                name='postalCode'
                                                onChange={(e) => setPostalCode(e.target.value)} />
                                        </CityPostalCode>
                                        <Input type="text"
                                            placeholder="Street address"
                                            value={streetAddress}
                                            name='streetAddress'
                                            onChange={(e) => setStreetAddress(e.target.value)} />
                                        <Input type="text"
                                            placeholder="Province City State"
                                            value={province}
                                            name='province'
                                            onChange={(e) => setProvince(e.target.value)} />
                                        <Input type="text"
                                            placeholder="Country"
                                            value={country}
                                            name='country'
                                            onChange={(e) => setCountry(e.target.value)} />
                                        <Buttons
                                            black
                                            block
                                            onClick={goToPayment}
                                        >
                                            Continue to payment
                                        </Buttons>
                                    </>
                                )}
                            </WhiteBox>
                        </RevealWrapper>
                    }



                </ColumnWrapper>
            </Center>
        </>
    )
}

