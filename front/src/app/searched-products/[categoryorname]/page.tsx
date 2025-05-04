
import Categories from '@/components/categories/Categories';
import Hero from '@/components/heros/HeroProducts';
import React from 'react'

type PageProps = {
  params: {
    categoryorname: string;
  };
};

export default async function CategoryOrNamePage({ params }: PageProps) {

  return (
    <>
      <Hero />
      <Categories params={ params }/>
    </>
  );
}
  
