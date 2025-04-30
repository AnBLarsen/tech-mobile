"use client";
import { IProduct } from '@/types';
import Image from 'next/image';
import { CreditCard, ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from '@headlessui/react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

const CartView = () => {
    const { cart, setCart, subtotal, tax, total } = useCart();

    const handleRemoveItem = (itemId: number) => {
        const updatedCart = cart.filter(item => item.id !== itemId);
        setCart(updatedCart);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            {cart.length === 0 ? (
                <p className="text-center text-lg text-gray-600">Your cart is empty</p>
            ) : (
                <>
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">My Cart</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        
                        <div className="lg:col-span-2 space-y-6">
                            {cart.map((item: IProduct) => (
                                <div
                                key={item.id}
                                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border bg-neutral-100 border-gray-200 rounded-2xl shadow-sm"
                                >
                                    <div className="relative w-full sm:w-40 h-40 rounded-xl overflow-hidden flex-shrink-0">
                                        <Image
                                        loader={({ src }) => src}
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="rounded-xl object-contain"
                                        unoptimized
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                                        <p className="text-gray-500 mb-1">{item.description}</p>
                                        <p className="text-lg font-bold text-gray-800">${item.price.toFixed(2)}</p>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveItem(item.id)}
                                        className="text-[#2E50EB] hover:text-red-500 transition-colors cursor-pointer"
                                        title="Remove item"
                                    >
                                        <Trash2 size={24} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="h-fit bg-neutral-100 border border-gray-200 rounded-2xl shadow-md p-6 sticky top-20">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>
                            <div className="flex justify-between mb-2 text-gray-700">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mb-2 text-gray-700">
                                <span>Tax (13%)</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mb-2 text-gray-700">
                                <span>Delivery</span>
                                <span className="text-green-600">Free</span>
                            </div>
                            <hr className="my-4" />
                            <div className="flex justify-between text-lg font-bold text-gray-900 mb-6">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Link href="/checkout">
                                    <Button className="w-full rounded bg-[#2E50EB] py-3 px-6 text-sm text-white font-bold hover:bg-[#5C77EF] active:bg-[#1437D1] flex items-center justify-center gap-2 cursor-pointer">
                                        <CreditCard className="w-4 h-4" />
                                        Go to Checkout
                                    </Button>
                                </Link>
                                <Link href="/products">
                                    <Button className="w-full rounded bg-none border-1 py-3 px-6 text-sm text-[#2E50EB] font-bold hover:bg-[#5C77EF] hover:text-white active:bg-[#1437D1] flex items-center justify-center gap-2 cursor-pointer">
                                        <ShoppingCart className="w-4 h-4" />
                                        Continue Shopping
                                    </Button>
                                </Link>

                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartView;
