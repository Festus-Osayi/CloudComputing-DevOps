import Featured from "@/components/featured/Featured"
import Header from "@/components/header/Header"
import NewProducts from "@/components/newproducts/NewProducts"
import { createConnections } from "@/lib/mongoose"
import { Product } from "@/models/products"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]"
import { WishedProducts } from "@/models/wishedproduct"
import { Settings } from "@/models/settings"
import { useRouter } from "next/router"
import axios from "axios"
import { useEffect, useState, useCallback } from "react"
export default function Home({ featuredProduct, newProduct, wishedProducts }) {

  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts products={newProduct} wishedProducts={wishedProducts} />
    </div>


  )
}

export const getServerSideProps = async (context) => {
  await createConnections();

  try {
    const featuredProductById = await Settings.findOne({ name: 'featuredProductsId' });
    const featuredProductId = featuredProductById?.value;

    // Check if featuredProductId exists in the database
    if (featuredProductId) {
      const featuredProduct = await Product.findById(featuredProductId);
      const newProduct = await Product.find({}, null, { sort: { '_id': -1 }, limit: 10 });

      /** wished list */
      const session = await getServerSession(context.req, context.res, authOptions);

      const wishedNewProducts = session?.user
        ? await WishedProducts.find({
          userEmail: session?.user.email,
          product: newProduct.map((p) => p._id.toString()),
        })
        : [];

      return {
        props: {
          featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
          newProduct: JSON.parse(JSON.stringify(newProduct)),
          wishedProducts: wishedNewProducts.map((i) => i.product.toString()),
        },
      };
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  // Handle the case where the featuredProductId is not found or an error occurs
  // You can return default data or an empty state, depending on your requirements
  return {
    props: {
      featuredProduct: null, // You can set a default value or null
      newProduct: [], // You can set a default value or an empty array
      wishedProducts: [], // You can set a default value or an empty array
    },
  };
};


