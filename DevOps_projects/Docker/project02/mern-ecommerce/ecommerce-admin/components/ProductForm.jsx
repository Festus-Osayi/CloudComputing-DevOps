import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Spinners from "./Spinners";
import { ReactSortable } from "react-sortablejs"; /** for file drag-drop */

function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  category: assignedCategory,
  properties: assignedProperties,
}) {
  /** application states */
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [goToProduct, setGotoProduct] = useState(false);
  const [images, setImages] = useState(existingImages || []);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(assignedCategory || "");
  const [productProperties, setProductProperties] = useState(
    assignedProperties || {}
  );
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsCategoriesLoading(true);
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
      setIsCategoriesLoading(false);
    });
  }, []);

  /** Adding products
   * states to control the event (createProduct)
   * function to create a product
   */
  const saveProduct = async (e) => {
    e.preventDefault();
    const data = {
      title,
      description,
      price,
      images,
      category,
      properties: productProperties,
    };
    if (_id) {
      /** update an existing id */
      await axios.put(`/api/products/`, { ...data, _id });
    } else {
      /* add new record*/
      await axios.post("/api/products", data);
    }
    setGotoProduct(true);
  };

  /** save categories and go to products page.. */
  if (goToProduct) {
    router.push("/products");
  }
  /** functionality to upload images */
  const uploadImages = async (e) => {
    const files = e.target.files;

    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        // append each image with its own key in formData object
        data.append("file", file);
      }
      try {
        const response = await axios.post("/api/upload", data);
        setImages((oldImages) => [...oldImages, ...response.data.links]);
      } catch (error) {
        console.error(error.message);
      }
    }
    setIsUploading(false);
  };

  /** functionality for drag-drop */
  const updateImagesOrder = (images) => {
    setImages(images);
  };

  /** functionality to set the product property */
  const setProductProp = (productName, value) => {
    setProductProperties((prev) => {
      const newProductProperties = { ...prev };
      newProductProperties[productName] = value;

      return newProductProperties;
    });
  };

  /** fetch all categories id
   * with their respective properties
   */
  const propertiesToFill = [];
  if (categories.length > 0 && category) {
    /** push all the items with "properties" to the array
     * find the items whose id matches the parent _id
     * push to the (propertiesToFill) array
     */
    let catInfo = categories.find(({ _id }) => _id === category);
    propertiesToFill?.push(...catInfo?.properties);
    while (catInfo?.parent?._id) {
      const parentCat = categories.find(
        ({ _id }) => _id === catInfo?.parent?._id
      );
      propertiesToFill.push(...parentCat.properties);
      catInfo = parentCat;
    }
  }

  return (
    <>
      <form onSubmit={saveProduct}>
        <label>Product name</label>
        <input
          required
          type="text"
          placeholder="product name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* render all categories */}
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value={""}>Uncatigorized</option>
          {categories &&
            categories.length > 0 &&
            categories.map((category) => (
              //render category options
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
        {/* spinners */}
        {
          isCategoriesLoading && (
            <Spinners/>
          )
        }
        {/* render all the products properties */}
        {propertiesToFill.length > 0 &&
          propertiesToFill.map((p, index) => (
            <div className="" key={index}>
              <div>{p.name[0].toUpperCase() + p.name.slice(1)}</div>
              <div>
                <select
                  value={productProperties[p.name]}
                  onChange={(e) => setProductProp(p.name, e.target.value)}
                >
                  {/* map through all the catagories properties */}
                  {p.values.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        <label>Photos</label>
        <div className="mb-2 flex flex-wrap gap-1">
          <ReactSortable
            list={images}
            setList={updateImagesOrder}
            className="flex flex-wrap gap-1"
          >
            {images &&
              images.length > 0 &&
              images.map((links) => (
                <div
                  key={links}
                  className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200"
                >
                  <picture>
                    <img src={links} alt="pics" className="rounded-lg " />
                  </picture>
                </div>
              ))}
          </ReactSortable>
          {/* spinner functionality, while image is uploading */}
          {isUploading && (
            <div className="h-24 flex items-center">
              <Spinners />
            </div>
          )}
          <label className="w-24 h-24 tex-sm text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-lg bg-white shadow-sm border border-primary cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            <div>Upload</div>
            <input type="file" className="hidden" onChange={uploadImages} />
          </label>
        </div>
        <label>Description</label>
        <textarea
          required
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label>Price (in USD)</label>
        <input
          required
          type="number"
          placeholder="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit" className="btn-primary">
          Save
        </button>
      </form>
    </>
  );
}

export default ProductForm;
