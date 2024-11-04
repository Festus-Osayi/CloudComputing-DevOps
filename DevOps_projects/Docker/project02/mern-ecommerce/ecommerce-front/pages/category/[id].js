import Center from "@/components/center/Center";
import Header from "@/components/header/Header";
import ProductsGrid from "@/components/reusable-styles/ProductsGrid";
import Spinner from "@/components/spinner/Spinner";
import { createConnections } from "@/lib/mongoose";
import { Category } from "@/models/category";
import { Product } from "@/models/products";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { WhiteBox } from "@/components/reusable-styles/WhiteBox";


/** styling */
const CategoryHeader = styled.div`
display: flex;
align-items: center;
justify-content: space-between;

h1{
    
    font-size: 1.5em;
}
`
const FilterWrappers = styled.div`
display: none;
gap: 15px;

 @media screen and (min-width: 768px) {
    display: flex;
 }
`
const Filter = styled.div`
background-color: #ddd;
padding: 5px 10px;
border-radius: 5px;
display: flex;
gap: 5px;
color: #444;
select{
    background-color: transparent;
    border: 0;
    font-size: inherit;
    color: #444;
}

`


export default function CategoryPage({
    category,
    products: originalProducts,
    subCategories }) {

    /**************** default states ****************/
    const defaultFilter = category.properties
        .map((c) => ({ name: c.name, values: 'all' }));
    const defaultSorting = '_id-asc';
    /**************** application states ************/
    const [filterValues, setFilterValues] = useState(defaultFilter)
    const [products, setProducts] = useState(originalProducts)
    const [sort, setSort] = useState(defaultSorting)
    const [loadingProducts, setLoadingProducts] = useState(false)
    const [filterChanged, setFilterChanged] = useState(false)
    /*************** application states ************/


    /** functionality that handles the filter categories */
    const handleFilterChange = (filterName, filterValue) => {
        setFilterValues((prev) => {
            return prev.map(p => ({
                name: p.name,
                values: p.name === filterName ? filterValue : p.values
            }))
        })
        setFilterChanged(true)
    }



    /** on mount get all the subCategories */
    useEffect(() => {
        if (!filterChanged) {
            //get all the products from db
            return;
        }
        setLoadingProducts(true)
        const catId = [category._id, ...(subCategories.map((c) => c._id)) || []]
        const param = new URLSearchParams;
        param.set('categories', catId.join(','))
        param.set('sort', sort)
        filterValues.forEach(p => {
            /** check for properties
             * without the default (all)
             * options
             */
            if (p.values !== 'all') {
                param.set(p.name, p.values)
            }

        })
        const url = `/api/products?${param.toString()}`
        axios.get(url).then((res) => {
            setProducts(res.data)
            setLoadingProducts(false)

        })
    }, [filterValues, sort, filterChanged])
    return (
        <>
            <Header />
            <Center>
                <CategoryHeader>
                    
                    <h1>{category.name}</h1>
                    <FilterWrappers>
                        {/* TODO: map through all categories properties */}
                        {
                            category.properties.map((prop, index) => (
                                <Filter key={index}>
                                    <span>{prop.name}:</span>
                                    <select
                                        value={filterValues.find(f => f.name === prop.name).value}
                                        onChange={(e) => handleFilterChange(prop.name, e.target.value)}
                                    >
                                        <option value='all'>All</option>
                                        {prop.values.map((v, index) => (
                                            <option key={index} value={v}>{v}</option>

                                        ))}
                                    </select>
                                </Filter>
                            ))}
                        {/* sort by price functionality */}
                        <Filter>
                            <span>Sort:</span>
                            <select
                                value={sort}
                                onChange={(e) => {
                                    setSort(e.target.value)
                                    setFilterChanged(true)
                                }}
                            >
                                <option value='price-asc'>
                                    price, lowest first
                                </option>
                                <option value='price-desc'>
                                    price, highest first
                                </option>
                                <option value='_id-desc'>
                                    newest first
                                </option>
                                <option value='_id-asc'>
                                    oldest first
                                </option>
                            </select>
                        </Filter>
                    </FilterWrappers>
                </CategoryHeader>
                {/* preloader for products */}
                {
                    loadingProducts && <Spinner fullWidth />
                }
                
                {


                    !loadingProducts && <div>
                        {products.length > 0 ? <ProductsGrid products={products} /> : <WhiteBox>Sorry, no product found</WhiteBox>}
                    </div>
                }

            </Center >
        </>
    )
}

/** find all Categories
 * with (sub-categories)
 */

export const getServerSideProps = async (context) => {
    await createConnections()

    const category = await Category.findById(context.query.id);
    /** get all sub-categories 
     * categories
     * products
    */
    const subCategories = await Category.find({ parent: category._id })
    const catId = [category._id, ...subCategories.map((c) => c._id)]
    const products = await Product.find({ category: catId })
    return {
        props: {
            category: JSON.parse(JSON.stringify(category)),
            products: JSON.parse(JSON.stringify(products)),
            subCategories: JSON.parse(JSON.stringify(subCategories))
        }
    }

}
