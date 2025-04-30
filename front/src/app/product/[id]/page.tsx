import ProductDetail from "@/components/card/ProductDetail";
import { getProductById } from "@/helpers/productsFetching";
import React from "react";

export default async function ProductPage ({params}: {params: Promise<{id: string}>})  {
    const { id } = await params;
    const product = await getProductById(id);

    return (
       <>
            <ProductDetail product={product}/>
       </>
    )
}

