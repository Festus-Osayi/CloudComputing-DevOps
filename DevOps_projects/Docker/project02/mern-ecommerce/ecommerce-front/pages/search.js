import Center from "@/components/center/Center";
import Header from "@/components/header/Header";
import Input from "@/components/input/Input";
import styled from "styled-components";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ProductsGrid from "@/components/reusable-styles/ProductsGrid";
import { debounce } from "lodash";
import { WhiteBox } from "@/components/reusable-styles/WhiteBox";
import Spinner from "@/components/spinner/Spinner";


/** styling */
const SearchInput = styled(Input)`
padding: 5px 10px;
border-radius: 5px;
font-size: 1.4rem;

`
const InputWrapper = styled.div`
position: sticky;
top: 68px;
margin: 25px 0;
padding: 5px;
background-color:#eee;
`
export default function SearchPage() {
    /** application states **/
    const [phrase, setPhrase] = useState('')
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const debouncedSearch = useCallback(debounce(searchProducts, 500), [])

    useEffect(() => {

        if (phrase.length > 0) {
            setIsLoading(true)
            debouncedSearch(phrase)
        } else {
            setProducts([]);
        }

    }, [phrase])

    /** make a fetch request to products endpoint
         * and update our search product
         *  with the products returned
        */
    function searchProducts(phrase) {
        axios.get(`/api/products?phrase=${encodeURIComponent(phrase)}`)
            .then(res => {
                setProducts(res.data)
                setIsLoading(false)
            })
    }




    return (
        <>
            <Header />
            <Center>
                <InputWrapper>
                    <SearchInput value={phrase} onChange={(e) => setPhrase(e.target.value)} autoFocus placeholder='search for a product' />
                </InputWrapper>
                {/* display the appropriate message if there are no results or we have not searched yet*/}
                {!isLoading && phrase !== '' && products.length === 0 && <WhiteBox>
                    <h2>No product found for query &quot;{phrase}&quot;</h2>
                    <em>Try searching for something else</em>
                </WhiteBox>}
                {/* spinner */}
                {
                    isLoading && <Spinner fullWidth={true} />
                }
                {/* list of all products that match the current search term */}
                {
                    !isLoading && products.length > 0 && <ProductsGrid products={products} />
                }

            </Center>
        </>
    )
}

