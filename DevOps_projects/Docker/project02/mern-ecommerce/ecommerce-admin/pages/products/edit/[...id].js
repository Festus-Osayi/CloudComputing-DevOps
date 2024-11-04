import Layout from "@/components/Layout";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";
import ProductForm from "@/components/ProductForm";
import Spinners from "@/components/Spinners";

export default function EditProductPage() {
  /** application states
   * router for the specific route
   */
  const [productInfo, setProductInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {id} = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    /** fetch the give url */
    setIsLoading(true);
    axios.get(`/api/products?id=${id}`).then(response => {
      setProductInfo(response.data);
      setIsLoading(false);
    });
  }, [id]);
  return (
    <Layout>
      <h1>Edit product</h1>
      {isLoading && (
        <Spinners />
      )}
      {productInfo && (
        <ProductForm {...productInfo} />
      )}
    </Layout>
  );
}