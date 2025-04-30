"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import products from '@/helpers/products';
import ButtonLink from '../Buttons/ButtonLink';


export default  function HomeBestSellers() {
 
  return (
    <section className="py-12 px-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-8 text-center">Best Sellers</h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        spaceBetween={20}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="w-full"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="bg-neutral-50 p-6 rounded-lg shadow hover:shadow-lg transition overflow-hidden h-full flex flex-col">
              <div className="relative w-full h-64">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </div>
              <div className="p-4 flex-grow flex flex-col justify-between items-center">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-blue-600 font-bold text-xl">${product.price}</p>
              </div>
              <div className="flex justify-center my-5">
                <ButtonLink href="/products">
                  Go to Products
                </ButtonLink>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
