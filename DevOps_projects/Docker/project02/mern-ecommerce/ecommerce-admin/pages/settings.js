import Layout from "@/components/Layout";
import Spinners from "@/components/Spinners";
import axios from "axios";
import { useState, useEffect } from "react";
import { withSwal } from "react-sweetalert2";


function SettingsPage({ swal }) {
    /************ application states ************/
    const [featuredProducts, setFeaturedProducts] = useState([])
    const [featuredProductsId, setFeaturedProductsId] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [shippingFee, setShippingFee] = useState('')
    /** fetch products on mount */
    useEffect(() => {
        setIsLoading(true)
        fetchAll()

    }, [])

    /** functionality to fetch all product */
    const fetchAll = async () => {
        await axios.get('/api/products').then((res) => {
            setFeaturedProducts(res.data)

        })


        await axios.get('/api/settings?name=featuredProductsId')
            .then((res) => {
                setFeaturedProductsId(res.data.value)

            })
        await axios.get('/api/settings?name=shippingFee')
            .then((res) => {
                setShippingFee(res?.data?.value)

            })

        setIsLoading(false)
    }

    /** functionality to save the given settings */
    const saveSettings = async () => {
        setIsLoading(true)
        await axios.put('/api/settings', {
            name: 'featuredProductsId',
            value: featuredProductsId,
        })
        await axios.put('/api/settings', {
            name: 'shippingFee',
            value: shippingFee,
        })
        setIsLoading(false)
        // show success message
        await swal.fire({
            title: "Settings successfully saved",
            icon: 'success'
        })

    }
    return (
        <Layout>
            <h2>Settings</h2>
            {/* spinner */}
            {
                isLoading && <Spinners fullWidth={true} />
            }
            {/* map through all the featured products array */}
            {
                !isLoading && (
                    <>
                        <label>Featured products</label>
                        <select
                            value={featuredProductsId}
                            autoFocus
                            onChange={(e) => setFeaturedProductsId(e.target.value)}
                        >
                            {
                                featuredProducts.length > 0 && featuredProducts.map((p) => (
                                    <option key={p._id} value={p._id}>{p.title}</option>
                                ))
                            }
                        </select>
                        <label>Shipping fee</label>
                        <input
                            type="number"
                            value={shippingFee}
                            onChange={(e) => setShippingFee(e.target.value)}
                        />
                        <div>
                            <button
                                onClick={saveSettings}
                                className="btn-primary"
                            >
                                Save settings
                            </button>
                        </div>
                    </>
                )
            }
        </Layout>
    )
}

/** sweet alert */
export default withSwal(({ swal }) => (
    <SettingsPage swal={swal} />
))

