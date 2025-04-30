import { getProducts } from '@/helpers/productsFetching'
import React from 'react'

const NewProduct = async () => {
    const products = await getProducts();

  return (
    <>
    
        <div>newProduct</div>

        <div>{products[0].name}</div>
    </>
  )
}

export default NewProduct