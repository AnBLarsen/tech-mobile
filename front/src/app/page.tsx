'use client';

import HomeBestSellers from "@/components/caroussel/HomeBestSellers";
import HeroHome from "@/components/heros/HeroHome";
import HomeCategories from "@/components/home-sections/HomeCategories";
import HomePromo from "@/components/home-sections/HomePromo";
import HomeReviews from "@/components/home-sections/HomeReviews";




export default function Home() {
  
  
  return (
    <>  

      
      <HeroHome/>
     
      <HomeCategories/>
      
      <HomeBestSellers/>

      <HomePromo/>

      <HomeReviews/>
        
    </>
  );
}

