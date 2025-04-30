/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreditCard } from 'lucide-react';
import { PaymentFormData, PaymentSchema } from '@/types/paymentSchema';
import ButtonPrimary from '../Buttons/ButtonPrimary';
import { useAuth } from '@/context/UserContext';
import { createOrders } from '@/helpers/usersOrdersFetching';
import { useCart } from '@/context/CartContext';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Payment = () => {
  const { user } = useAuth();
  const { cart, clearCart, subtotal, tax, total } = useCart();
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(PaymentSchema),
  });
  
  const handleCardInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 16);
    value = value.replace(/(.{4})/g, '$1 ').trim();
    setValue('cardNumber', value);
  };
  
  const handlePurchase = async () => {
    if (user?.token && cart.length > 0) {
      const idProducts = cart.map(product => product.id);
      try {
        await createOrders(user.token, idProducts);
        clearCart();
      } catch (err) {
        console.error(err);
      }
    }
  };
  const router = useRouter();

  const onSubmit = (data: PaymentFormData) => {
    if (status === 'processing') return;
    setStatus('processing');
    setTimeout(async () => {
      const success = Math.random() > 0.2;
      if (success) {
        await handlePurchase();
        setStatus('success');
        toast('🛍️ Thank you for your purchase! Your order is on the way', {
          duration: 4000,
          style: {
            background: '##f5f5f5',
            color: '#555555',
            borderRadius: '12px',
          },
        });
        reset();
        setTimeout(() => router.replace('/dashboard'), 2000);
      } else {
        setStatus('error');
        toast('😶‍🌫️ Payment failed. Please, try again!', {
          duration: 4000,
          style: {
            background: '#f5f5f5',
            color: '#555555',
            borderRadius: '12px',
          },
        });
      }
    }, 1500);
  };


  return (
    <>
      <h2 className="text-3xl pt-10 font-bold text-gray-800 mb-8 text-center">Payment Details</h2>

      <div className="max-w-xl mx-auto bg-neutral-100 rounded-2xl shadow-md p-8 space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="font-semibold text-gray-700 mb-1 block">Card Number</label>
            <input
              className="w-full bg-white p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E50EB]"
              placeholder="1234 5678 9012 3456"
              {...register('cardNumber')}
              onChange={handleCardInput}
            />
            {errors.cardNumber && (
              <p className="text-red-600 mt-1">{errors.cardNumber.message}</p>
            )}
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="font-semibold text-gray-700 mb-1 block">Expiry Date</label>
              <input
                className="w-full bg-white p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E50EB]"
                placeholder="MM/YY"
                {...register('expiry')}
              />
              {errors.expiry && (
                <p className="text-red-600 mt-1">{errors.expiry.message}</p>
              )}
            </div>

            <div className="w-1/2">
              <label className="font-semibold text-gray-700 mb-1 block">CVC</label>
              <input
                className="w-full bg-white p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E50EB]"
                placeholder="CVC"
                {...register('cvc')}
              />
              {errors.cvc && (
                <p className="text-red-600 mt-1">{errors.cvc.message}</p>
              )}
            </div>
          </div>

          <div className="mt-8 flex items-center">
            <ButtonPrimary
              type="submit"
              disabled={status === 'processing'}
              loading={status === 'processing'}
            >
              {status === 'processing' ? (
                '🛍️ Wrapping up your order...'
              ) : (
                <span className="flex items-center">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Pay Now
                </span>
              )}

            </ButtonPrimary>

          </div>
        </form>

        
        <div className="pt-6 border-t border-gray-300 text-gray-700 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (13%):</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
