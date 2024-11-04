import { createContext, useState, useEffect } from "react"



export const CartContext = createContext({})

/** cart state and actions provider*/
export default function CartContextProvider({ children }) {
    const [cartProducts, setCartProducts] = useState([])
    /** add product */
    const addToProducts = (productId) => {
        setCartProducts((prev) => [...prev, productId])
    }
    /** remove product */
    const removeProducts = (productId) => {
        setCartProducts((prev) => {
            const pos = prev.indexOf(productId)
            /** check if the indexOf --> (-1) */
            if (pos !== -1) {
                return prev.filter((_, index) => index !== pos);
            } else {
                return prev;
            }

        })
    }
    /** a functionality to clear cart */
    function clearCart() {
        /** the cart in local storage */
        localStorage.removeItem('cart')
        /** set the cart to an empty array */
        setCartProducts([]);
    }
    useEffect(() => {
        /** save the products to local storage on mount */
        if (cartProducts.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cartProducts))
        }
    }, [cartProducts])

    useEffect(() => {
        /** get the items in local storage */
        if (localStorage.getItem('cart')) {
            setCartProducts(JSON.parse(localStorage.getItem('cart')))
        }
    }, [])
    return (
        <CartContext.Provider value={{ cartProducts, setCartProducts, addToProducts, removeProducts, clearCart }}>{children}</CartContext.Provider>
    )


}