/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormInputs, registerSchema } from "@/types/authSchema";
import ButtonPrimary from "../Buttons/ButtonPrimary";
import {useAuth} from "../../context/UserContext"
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Link from "next/link";



export default function RegisterForm () {
    const {registerUser} = useAuth();
    const router = useRouter();

    if (!registerUser) {
        throw new Error("UsersContext is not available");
    }

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
        reset,
    } =  useForm<RegisterFormInputs>({
        resolver: zodResolver(registerSchema),
    })
    
    const onSubmit = async (data: RegisterFormInputs) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            await registerUser(data);

            toast.success("Registration successful! Redirecting...");
            reset();
            setTimeout(() => router.replace('/login'), 2000);
        } catch (error:any) {
            const message = error?.message || "Registration failed. Try again"
            toast.error(message);
            setError("email", {message});
           
        }
    }

    return (

        <>
        
            <div className="max-w-md mx-auto mt-10 mb-10 p-6 bg-neutral-50 rounded-xl">

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-sm">
                    <div>
                        <label>Name</label>
                        <input {...register("name")} className="w-full p-2 bg-white rounded-md" placeholder="John Smith" />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label>Email</label>
                        <input {...register("email")} className="w-full  p-2 bg-white rounded-md" placeholder="johnSmith@mail.com" />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>
                    
                    <div>
                        <label>Address</label>
                        <input {...register("address")} className="w-full  p-2 bg-white rounded-md" placeholder="123 Charles St, Toronto, ON"/>
                        {errors.address && <p className="text-red-500">{errors.address.message}</p>}
                    </div>

                    <div>
                        <label>Phone</label>
                        <input {...register("phone")} className="w-full  p-2 bg-white rounded-md" placeholder="123-456-7890"/>
                        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
                    </div>

                    <div>
                        <label>Password</label>
                        <input type="password" {...register("password")} className="w-full  p-2 bg-white rounded-md" />
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    </div>

                    <div>
                        <label>Confirm Password</label>
                        <input type="password" {...register("confirmPassword")} className="w-full  p-2 bg-white rounded-md" />
                        {errors.confirmPassword && (
                            <p className="text-red-500">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    <ButtonPrimary type="submit" disabled={isSubmitting}>Register</ButtonPrimary>
                    <p className="text-sm text-gray-700">
                        Already have an account?{" "}
                        <Link href="/login" className="text-blue-500 hover:underline">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </>
    )
        
    
}