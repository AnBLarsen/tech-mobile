import { Button } from "@headlessui/react";
import Image from "next/image";
import { Headphones, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function HomePromo () {
  return (
    <section className="mx-auto flex items-center justify-center p-8">
        <div className="w-6xl min-h-[300px] mx-auto bg-neutral-50 rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden">
            
            
            <div className="relative w-full md:w-1/2 h-80 md:h-auto">
                <Image
                    src="/promo-april.jpeg"
                    alt="Promo April"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    priority
                />
                </div>

            
                <div className="w-full md:w-1/2 flex flex-col justify-between p-8">
                <div className="text-center">
                    <div className="flex justify-center items-center gap-2 text-blue-800 text-2xl font-bold mb-6">
                    <h3>🎉 April Deals Are Here!</h3>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                    Get <span className="text-blue-600">30% OFF</span> on All Headphones!
                    </h3>

                    <p className="text-gray-700 text-base flex justify-center items-center gap-2">
                    <Headphones className="w-5 h-5 text-blue-500" />
                    Premium sound. Sleek design. Unbeatable price.
                    </p>
                </div>

                <div className="flex justify-center mt-6 md:mt-auto">
                    <Link  href="/products">
                    
                        <Button className="rounded bg-[#2E50EB] py-2 px-8 text-sm text-white font-bold hover:bg-[#5C77EF] active:bg-[#1437D1] flex items-center gap-2 cursor-pointer">
                            <ShoppingCart className="w-4 h-4" />
                            Shop Now
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    </section>
  );
};


