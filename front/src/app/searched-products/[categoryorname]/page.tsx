
import Categories from '@/components/categories/Categories';
import Hero from '@/components/heros/HeroProducts';
import { getProductByNameOrCategory } from '@/helpers/productsFetching';
import React from 'react'



export default async function CategoryOrNamePage({ params }: { params: Promise<{ categoryorname: string }> }) {
  const { categoryorname } =  await params;
  
  const products = await getProductByNameOrCategory(categoryorname);

  return (
    <>
      <Hero />
      <Categories params={{ categoryorname }} />
    </>
  );
}
  
