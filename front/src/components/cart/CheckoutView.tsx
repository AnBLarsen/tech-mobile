"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema, CheckoutFormInputs } from "@/types/checkoutSchema";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CreditCard } from "lucide-react";

export default function CheckoutForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormInputs>({
    resolver: zodResolver(checkoutSchema),
  });

  const sameAsShipping = watch("sameAsShipping");

  useEffect(() => {
    if (sameAsShipping) {
      setValue("billingAddress", watch("shippingAddress"));
    }
  }, [sameAsShipping, setValue, watch]);

  const onSubmit = async (data: CheckoutFormInputs) => {
    console.log(data)
    await new Promise((res) => setTimeout(res, 1000));
    router.push("/payment");
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Checkout</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-neutral-100  rounded-2xl p-8 space-y-6"
      >
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Full Name</label>
          <input
            {...register("fullName")}
            placeholder="Jane Doe"
            className="w-full p-3 rounded-md bg-white"
          />
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Email</label>
            <input
              {...register("email")}
              placeholder="janed@mail.com"
              className="w-full p-3 rounded-md bg-white"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Phone</label>
            <input
              {...register("phone")}
              placeholder="111-222-3333"
              className="w-full p-3 rounded-md bg-white"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Shipping Address</label>
          <input
            {...register("shippingAddress")}
            placeholder="123 street, Toronto"
            className="w-full p-3 rounded-md bg-white"
          />
          {errors.shippingAddress && <p className="text-red-500 text-sm mt-1">{errors.shippingAddress.message}</p>}
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" {...register("sameAsShipping")} />
          <label className="text-sm text-gray-600">Billing address same as shipping</label>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Billing Address</label>
          <input
            {...register("billingAddress")}
            disabled={sameAsShipping}
            className={`w-full p-3 rounded-md  ${
              sameAsShipping ? "bg-gray-200 cursor-not-allowed" : "bg-white border-gray-300"
            }`}
          />
          {errors.billingAddress && <p className="text-red-500 text-sm mt-1">{errors.billingAddress.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#2E50EB] hover:bg-[#5C77EF] active:bg-[#1437D1] text-white font-bold py-3 rounded-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <CreditCard className="w-5 h-5" />
          Continue to Payment
        </button>
      </form>
    </div>
  );
}
