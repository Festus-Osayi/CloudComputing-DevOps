import Layout from "@/components/Layout"
import Spinners from "@/components/Spinners"
import axios from "axios"
import { set } from "mongoose"
import { useEffect, useState } from "react"
import { withSwal } from "react-sweetalert2" // pop up window

export function Categories({ swal }) {
    /** states */
    const [name, setName] = useState('')
    const [editedCategory, setEditedCategory] = useState(null)
    const [categories, setCategories] = useState([])
    const [parentCategory, setParentCategory] = useState('')
    const [properties, setProperties] = useState([])
    const [isLoadingCategories, setIsLoadingCategories] = useState(false)

    useEffect(() => {
        fetchCategories()
    }, [])

    /** fetch categories */
    const fetchCategories = () => {
        setIsLoadingCategories(true);
        axios.get('/api/categories').then((res) => {
            setCategories(res.data)
            setIsLoadingCategories(false)
        })
    }
    /** function to save a category */
    const saveCategory = async (e) => {

        e.preventDefault();
        const data = {
            name,
            parentCategory,
            properties: properties.map((p) => {
                return {
                    name: p.name,
                    values: p.values.split(',')
                }
            })

        };
        if (editedCategory) {
            try {
                data._id = editedCategory._id;
                await axios.put('/api/categories', data);
                setEditedCategory(null);
            } catch (err) {
                console.error(err.message);
            }

        } else {
            try {
                await axios.post('/api/categories', data);
            } catch (err) {
                console.log('Error while creating new Category')
            }
        }
        setName('');
        setParentCategory('')
        setProperties([])
        fetchCategories();

    }

    /** functionality to edit category */
    const editCategory = (category) => {
        setEditedCategory(category)
        setName(category.name)
        setParentCategory(category.parent?._id)
        setProperties(category.properties.map(({ name, values }) => ({
            name, values: values.join(',')
        })))


    }

    /** functionality to delete a category 
     * with some additional functionality
     * incoporated with react-sweetalert2
    */
    const deleteCategory = (category) => {
        /** fire when the user click on a category */
        swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete ${category.name}?`,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes, Delete!',
            confirmButtonColor: '#d55',
            reverseButtons: true,
        }).then(async result => {
            if (result.isConfirmed) {
                    const { _id } = category;
                    await axios.delete(`/api/categories?_id=${_id}`).then(()=>{
                        swal.fire({
                            title: `${category.name} Deleted Successfully`,
                            icon: 'success'
                        })
                    });
                    fetchCategories();
               
            } 
        }).catch((err)=>{
            swal.fire({
                title: `Unable to delete ${category.name}`,
                icon: 'error'
            })
        })
    }

    /** functionality to add property */
    const addProperty = () => {
        setProperties((prev) => {
            return [...prev, { name: '', values: '' }]
        })
    }

    /** handle the property name input on change */
    const handlePropertyNameChange = (index, property, newName) => {
        setProperties((prev) => {
            const properties = [...prev]
            properties[index].name = newName
            return properties
        })
    }

    /** handle the values input on change */
    const handlePropertyValuesChange = (index, property, newValues) => {
        setProperties((prev) => {
            const properties = [...prev]
            properties[index].values = newValues
            return properties
        })
    }

    /** functionality to remove property by it index */
    const removeProperty = (indexToRemove) => {
        setProperties((prev) => {
            return [...prev].filter((p, pIndex) => {
                return pIndex !== indexToRemove
            })
        })
    }
    return (
        <Layout>
            <h1>Categories</h1>
            <label>{editedCategory
                ? `Edit category ${editedCategory.name}`
                : 'Create new category'}</label>
            <form onSubmit={saveCategory}>
                <div className="flex gap-1">
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Category name" />
                    <select
                        onChange={ev => setParentCategory(ev.target.value)}
                        value={parentCategory}>
                        <option value="">No parent category</option>
                        {categories.length > 0 && categories.map(category => (
                            <option key={category._id} value={category._id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                {/* section for adding new property */}
                <div className="mb-2">
                    <label className="block">Properties</label>
                    <button
                        onClick={addProperty}
                        className="btn-default"
                        type="button"
                    >Add new properties
                    </button>

                    {
                        properties && properties.length > 0 && properties.map((property, index) => (
                            <div className="flex gap-1 my-2" key={''}>
                                <input
                                    className="mb-0"
                                    onChange={(e) => handlePropertyNameChange(index, property, e.target.value)}
                                    value={property.name}
                                    type="text"
                                    placeholder="property name (example: color)" />
                                <input
                                    className="mb-0"
                                    value={property.values}
                                    type="text" placeholder="values, comma seperated"
                                    onChange={(e) => handlePropertyValuesChange(index, property, e.target.value)}

                                />
                                <button type="button" onClick={() => removeProperty(index)} className="btn-red">Remove</button>
                            </div>

                        ))
                    }
                </div>
                <div className="flex gap-2">
                    {
                        editedCategory && (
                            <button
                                className="btn-default"
                                onClick=
                                {
                                    () => {
                                        setEditedCategory(null)
                                        setName('')
                                        setParentCategory('')
                                        setProperties([])
                                    }

                                }
                            >Cancel
                            </button>)
                    }
                    <button type="submit" className="btn-primary py-1 font-semibold">Save</button>
                </div>

            </form>
            {
                !editedCategory && (<table className="basic">
                    <thead>
                        <tr>
                            <th>Category Name</th>
                            <th>Parent Category</th>
                        </tr>
                    </thead>
                    {/** loop through the categories and render them */}
                    <tbody>
                        {
                            isLoadingCategories && (
                                <tr>
                                    <td colSpan='3'>
                                        <div className="py-4">
                                            <Spinners fullWidth={true} />
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                        {categories && categories.length > 0 && categories.map((category) => (

                            <tr key={category._id}>
                                {/* map over each category object and display its properties in table cells*/}
                                <td className="text-black">
                                    {category?.name}
                                </td>
                                <td>{category?.parent?.name}</td>
                                <td>
                                    <div className="flex gap-2">
                                        <button onClick={() => editCategory(category)} className="btn-primary">Edit</button>
                                        <button onClick={() => deleteCategory(category)} className="btn-red">Delete</button>
                                    </div>
                                </td>
                            </tr>


                        ))}
                    </tbody>
                </table>)
            }

        </Layout>
    )
}

export default withSwal(({ swal }, ref) => (
    <Categories swal={swal} />
));


