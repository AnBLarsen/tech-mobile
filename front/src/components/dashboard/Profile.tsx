/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useAuth } from '@/context/UserContext';
import { MapPinIcon, Phone, ChevronDown, ChevronUp, Check  } from 'lucide-react';
import Image from 'next/image';
import { getOrders } from '@/helpers/usersOrdersFetching';
import { useEffect, useState } from 'react';
import { IOrder, IProduct } from '@/types';
import ProfileAvatar from './ProfileAvatar';

const Profile = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [openOrderId, setOpenOrderId] = useState<number | null>(null);

    const toggleOrder = (orderId: number) => {
        setOpenOrderId(prev => (prev === orderId ? null : orderId));
    };
;

    const handleGetOrders = async () => {
        if (user?.token) {
            const response = await getOrders(user?.token);
            setOrders(response);
        }
    };

    useEffect(() => {
        handleGetOrders();
    }, [user]);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

        <div className="bg-neutral-100 p-6 rounded-xl ">

            <div className="flex flex-col md:flex-row gap-6 items-center justify-evenly">

                <ProfileAvatar name={user?.user.name || ''} />

                <div className="space-y-4 text-left">
                    
                    <h1 className="text-2xl font-semibold">
                    Hi, <span className="text-blue-600">{user?.user.name}</span>
                    </h1>
                    <div className="flex items-center">
                    <MapPinIcon className="mr-2 text-[#2E50EB]" />
                    <span>{user?.user.address}</span>
                    </div>
                    <div className="flex items-center">
                    <Phone className="mr-2 text-[#2E50EB]" />
                    <span>{user?.user.phone}</span>
                    </div>
                </div>
            </div>
        </div>

        
        <h2 className="text-xl font-semibold mb-4">Order History</h2>

       
        <div className="bg-neutral-50 p-6 rounded-xl">
       
        {orders.length === 0 ? (
            <p className="text-gray-500 text-center">No orders yet.</p>
        ) : (
            orders.map((order) => (
            <li
                key={order.id}
                className="rounded-xl p-4 bg-gray-100 list-none mb-4 transition-all duration-500 ease-[cubic-bezier(0.40,-0.55,0.27,1.55)] hover:scale-102"
            >
                <button
                onClick={() => toggleOrder(order.id)}
                className="w-full flex justify-between items-center text-left cursor-pointer"
                >
                <div>
                    <p className="font-semibold text-lg">Order #{order.id}</p>
                    <p className="text-sm text-gray-700">
                    {new Date(order.date).toLocaleDateString()}
                    </p>
                    <p className="font-semibold text-lg">{order.total}</p>
                    <p className="flex justify-center gap-0.5 text-sm text-green-600">
                        <Check size={18} />
                        {order.status === 'approved' ? 'Completed' : order.status}
                    </p>

                </div>
                {openOrderId === order.id ? (
                    <ChevronUp className="text-blue-600 cursor-pointer" />
                ) : (
                    <ChevronDown className="text-blue-600 cursor-pointer" />
                )}
                </button>

                <div
                className={`mt-4 space-y-4 overflow-hidden transition-all duration-600 ease-in ${
                    openOrderId === order.id ? 'max-h-screen' : 'max-h-0'
                }`}
                >
                {openOrderId === order.id &&
                    order.products.map((product: IProduct) => (
                    <div
                        key={product.id}
                        className="flex flex-col sm:flex-row justify-between gap-4 p-4 bg-neutral-50 rounded-2xl"
                    >
                        <div className="relative w-full sm:w-40 h-40 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="rounded-xl object-contain"
                            unoptimized
                            
                        />
                        </div>
                        <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-800">
                            {product.name}
                        </h3>
                        <p className="text-gray-500 mb-1">{product.description}</p>
                        <p className="text-lg font-bold text-gray-800">
                            ${product.price.toFixed(2)}
                        </p>
                        </div>
                    </div>
                    ))}
                </div>
            </li>
            ))
        )}
        </div>

    </div>
  );
};

export default Profile;
