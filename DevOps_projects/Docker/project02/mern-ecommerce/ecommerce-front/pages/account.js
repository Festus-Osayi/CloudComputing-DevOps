import Buttons from "@/components/buttons/Buttons";
import Center from "@/components/center/Center";
import Header from "@/components/header/Header";
import { WhiteBox } from "@/components/reusable-styles/WhiteBox";
import { useSession, signOut, signIn } from "next-auth/react"
import { RevealWrapper } from "next-reveal";
import styled from "styled-components";
import Input from "@/components/input/Input";
import { CityPostalCode } from "./cart";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import Spinner from "@/components/spinner/Spinner";
import ProductsCards from "@/components/productscards/ProductsCards";
import Tabs from "@/components/tabs/Tabs";
import SingleOrder from "@/components/orderItems/SingleOrder";
import { withSwal } from "react-sweetalert2";


/** styling */
const ColumnWrapper = styled.div`
display: grid;
grid-template-columns: 1fr;
gap: 30px;
margin: 40px 0;
hr{
    display: block;
    border: 0;
    border-top: 1px solid #ccc;
}
p{
    margin: 5px;
}

@media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr .8fr;
}
`
const WisHListGrid = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
gap: 40px;
`
function AccountPage({ swal }) {

    const { data: session } = useSession()

    /*************  application states ************/
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [streetAddress, setStreetAddress] = useState('')
    const [province, setProvince] = useState('')
    const [country, setCountry] = useState('')
    const [isAddressLoading, setIsAddressLoading] = useState(true)
    const [isWishListLoading, setIsWishListLoading] = useState(true)
    const [wishedList, setWishedList] = useState([])
    const [activeTabs, setActiveTabs] = useState('Orders')
    const [orders, setOrders] = useState([])
    const [isOrderLoading, setIsOrderLoading] = useState(true)

    /*********************************************/

    /** functionality for logout */
    async function logout() {
        await signOut({
            callbackUrl: process.env.NEXT_PUBLIC_URL
        });

    }

    /** functionality for login */
    async function handleLogin() {
        await signIn('google')
    }

    /** functionality to save address */
    const saveAddress = async () => {
        const data = {
            name, email,
            city, postalCode,
            streetAddress, province,
            country
        }
        await axios.put('/api/address', data)
        await swal.fire({
            title: "Account saved successfully",
            icon: 'success'
        })


    }

    /** fetch all the data on mount */
    useEffect(() => {
        /** check if the user is login or not */
        if (!session) {
            return;
        }
        setIsWishListLoading(false)
        setIsAddressLoading(false)
        setIsOrderLoading(false)
        axios.get('/api/address').then((res) => {

            /** update the state with response from server */
            setName(res?.data?.name)
            setEmail(res?.data?.email)
            setCity(res?.data?.city)
            setPostalCode(res?.data?.postalCode)
            setStreetAddress(res?.data?.streetAddress)
            setProvince(res?.data?.province)
            setCountry(res?.data?.country)
            setIsAddressLoading(true)
        })

        axios.get('/api/wishlist').then((res) => {
            setWishedList(res.data.map((wp) => wp.product))
            setIsWishListLoading(true)
        })

        axios.get('/api/orders').then((res) => {
            setOrders(res.data)
            setIsOrderLoading(true)
        })

    }, [session])

    /** functionality to remove from wishlist */
    const removeWishList = (idToRemove) => {
        setWishedList((prev) => {
            return [...prev.filter((products) => products._id.toString() !== idToRemove)]
        })
    }
    return (
        <>
            <>
                <Header />
                <Center>
                    <ColumnWrapper>
                        <div>

                            <RevealWrapper delay={0}>
                                <WhiteBox>
                                    <Tabs
                                        tabs={['Orders', 'Wishlist']}
                                        active={activeTabs}
                                        onChange={setActiveTabs}
                                    />
                                    {activeTabs === 'Orders' && (
                                        <>
                                            {!isOrderLoading && (
                                                <Spinner fullWidth={true} />
                                            )}
                                            {isOrderLoading && (
                                                <div>
                                                    {orders.length === 0 && !session && (
                                                        <p>Login to see your orders</p>
                                                    )}
                                                    {
                                                        session && orders.length === 0 && <p>Your order is empty</p>
                                                    }
                                                    {orders && orders.length > 0 && orders.map((o, index) => (
                                                        <SingleOrder key={index}  {...o} />
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    )}
                                    {activeTabs === 'Wishlist' && (
                                        <>
                                            {!isWishListLoading && (
                                                <Spinner fullWidth={true} />
                                            )}
                                            {isWishListLoading && (
                                                <>
                                                    <WisHListGrid>
                                                        {wishedList && wishedList.length > 0 && wishedList.map((wp) => (
                                                            <ProductsCards key={wp._id} {...wp} wished={true} onRemoveFromWishlist={removeWishList} />
                                                        ))}
                                                    </WisHListGrid>
                                                    {wishedList.length === 0 && (
                                                        <>
                                                            {session && (
                                                                <p>Your wishlist is empty</p>
                                                            )}
                                                            {!session && (
                                                                <p>Login to add products to your wishlist</p>
                                                            )}
                                                        </>
                                                    )}
                                                </>
                                            )}
                                        </>
                                    )}
                                </WhiteBox>
                            </RevealWrapper>
                        </div>
                        <div>
                            <RevealWrapper delay={100}>
                                <WhiteBox>
                                    <h2>{session ? 'Account details' : 'Login'}</h2>
                                    {!isAddressLoading && (
                                        <Spinner fullWidth={true} />
                                    )}
                                    {isAddressLoading && session && (
                                        <>
                                            <Input type="text"
                                                placeholder="Name"
                                                value={name}
                                                name="name"
                                                onChange={ev => setName(ev.target.value)} />
                                            <Input type="text"
                                                placeholder="Email"
                                                value={email}
                                                name="email"
                                                onChange={ev => setEmail(ev.target.value)} />
                                            <CityPostalCode>
                                                <Input type="text"
                                                    placeholder="City"
                                                    value={city}
                                                    name="city"
                                                    onChange={ev => setCity(ev.target.value)} />
                                                <Input type="text"
                                                    placeholder="Postal Code"
                                                    value={postalCode}
                                                    name="postalCode"
                                                    onChange={ev => setPostalCode(ev.target.value)} />
                                            </CityPostalCode>
                                            <Input type="text"
                                                placeholder="Street Address"
                                                value={streetAddress}
                                                name="streetAddress"
                                                onChange={ev => setStreetAddress(ev.target.value)} />
                                            <Input type="text"
                                                placeholder="Province City State"
                                                value={province}
                                                name="streetAddress"
                                                onChange={ev => setProvince(ev.target.value)} />
                                            <Input type="text"
                                                placeholder="Country"
                                                value={country}
                                                name="country"
                                                onChange={ev => setCountry(ev.target.value)} />
                                            <Buttons black block
                                                onClick={saveAddress}>
                                                Save
                                            </Buttons>
                                            <hr />
                                        </>
                                    )}
                                    {session && (
                                        <Buttons primary onClick={logout}>Logout</Buttons>
                                    )}
                                    {!session && (
                                        <Buttons primary onClick={handleLogin}>Login with Google</Buttons>
                                    )}
                                </WhiteBox>
                            </RevealWrapper>
                        </div>
                    </ColumnWrapper>
                </Center>
            </>

        </>

    )
}

export default withSwal(({ swal }) => (
    <AccountPage swal={swal} />
))

