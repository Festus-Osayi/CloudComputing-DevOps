import Layout from "@/components/Layout";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";

export default function DeleteProductPage() {
  /** application states
   * router for the specific route
   */
  const router = useRouter();
  const [productInfo,setProductInfo] = useState();
  const {id} = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    /** fetch the give url */
    axios.get(`/api/products?id=${id}`).then(response => {
      setProductInfo(response.data);
    });
  }, [id]);

  function goBack() {
    router.push('/products');
  }
  async function deleteProduct() {
    await axios.delete(`/api/products?id=${id}`);
    goBack();
  }
  return (
    <Layout>
      <h1 className="text-center">Do you really want to delete
        {`"${productInfo?.title}"`}?
      </h1>
      <div className="flex gap-2 justify-center">
        <button
          onClick={deleteProduct}
          className="bg-red-500 text-white w-20 rounded-md hover:bg-red-300">Yes</button>
        <button
          className="bg-blue-500 text-white w-20 rounded-md hover:bg-blue-300"
          onClick={goBack}>
          NO
        </button>
      </div>
    </Layout>
  );
}