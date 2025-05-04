
import Categories from '@/components/categories/Categories';
import Hero from '@/components/heros/HeroProducts';
import React from 'react'



export default async function CategoryOrNamePage({ params }: { params:{ categoryorname: string } }) {

  return (
    <>
      <Hero />
      <Categories params={ params }/>
    </>
  );
}
  
