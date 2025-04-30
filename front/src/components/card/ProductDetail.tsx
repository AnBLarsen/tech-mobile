"use client";

import Image from "next/image";
import { IProduct } from "@/types";
import { ShoppingCart } from "lucide-react";
import { useAuth } from "@/context/UserContext";
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";
import ButtonPrimary from "../Buttons/ButtonPrimary";


interface ProductDetailProps {
  product: IProduct;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  const { name, price, image, description } = product;
  
  const { user } = useAuth();
  const { cart, setCart } = useCart(); 
  const router = useRouter();
  
  const handleCart = () => {
    if (!user?.token) {
      toast.error("You need to log in to add items to the cart");
      setTimeout(() => router.replace('/login'), 1000);
    } else {
      const existingProduct = cart.find((item: IProduct) => item.id === product.id);
      if (existingProduct) {
        toast.error("Product already in cart");
      } else {
        const updatedCart = [...cart, product];
        setCart(updatedCart); 
        toast.success("Product added to cart");
        setTimeout(() => router.push('/cart'), 1000);
      }
    }
  };
  return (
    <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-xl p-6 gap-6 max-w-4xl mx-auto mt-10">
      
     
      <div className="relative w-full md:w-1/2 h-64 md:h-80">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-xl object-contain"
          unoptimized
        />
      </div>

   
      <div className="flex flex-col justify-between w-full md:w-1/2">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{name}</h2>
          <p className="text-gray-700 mb-6">{description}</p>
        </div>
        
       
        <p className="text-xl font-semibold text-blue-600 mb-4">From ${price}</p>

        <ButtonPrimary onClick={handleCart}>
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default ProductDetail;
