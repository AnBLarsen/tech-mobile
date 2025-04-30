"use client"
import Image from "next/image";
import React from "react";
import { IProduct } from "@/types";
import ButtonLink from "../Buttons/ButtonLink";
import { ShoppingCart } from "lucide-react";
import { useAuth } from "@/context/UserContext";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface CardProps {
  product: IProduct;
}

export default function Card({ product }: CardProps) {
    if (!product) {
        return <div>Producto no encontrado</div>; 
    }

    const { name, price, image, id } = product;
    const { user } = useAuth();
    const { cart, setCart } = useCart(); 
    const router = useRouter();

    const handleCart = () => {
        if (!user?.token) {
        toast.error("You need to log in to add items to the cart");
        setTimeout(() => router.replace('/login'), 1000);
        } else {
        const exists = cart.find((item) => item.id === product.id);
        if (exists) {
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
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col h-full overflow-hidden">
            <div className="relative w-full h-48 transform transition duration-300 hover:scale-110">
                <Image
                src={image}
                alt={name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="rounded-lg object-contain"
                unoptimized
                />
            </div>

            <div className="flex flex-col flex-grow mt-10">
                <div className="flex-grow">
                <h3 className="text-lg font-medium text-center mt-4">{name}</h3>
                <p className="text-gray-900 mt-2 text-center">
                    From <span className="font-bold text-blue-600">${price}</span>
                </p>
                </div>

                <div className="flex flex-col justify-center mt-4 gap-2">
                <ButtonLink href={`/product/${id}`}>View Details</ButtonLink>

                <button
                    onClick={handleCart}
                    className="rounded border border-[#2E50EB] bg-transparent py-2 px-8 text-sm text-[#2E50EB] font-bold hover:bg-[#5C77EF] hover:text-white active:bg-[#1437D1] cursor-pointer flex justify-center items-center"
                >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                </button>
                </div>
            </div>
        </div>
    );
}
