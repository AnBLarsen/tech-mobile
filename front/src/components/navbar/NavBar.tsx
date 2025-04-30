"use client";
import { useState } from "react";
import { ShoppingCart, UserCircle, ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/UserContext";
import Image from "next/image";
import { toast } from 'react-hot-toast';
import SearchBar from "./SearchBar";
import { categories } from "@/helpers/categories";

export default function NavBar() {
    const { user, logoutUser } = useAuth();

    const [productDropdown, setProductDropdown] = useState(false);
    const [userDropdown, setUserDropdown] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const router = useRouter();

    const handleLogoutClick = () => {
        logoutUser();
        toast.success("Logout successful! Redirecting...");
        setTimeout(() => router.replace('/'), 1000);
    };

    const handleCartClick = () => {
        if (user) {
            router.push("/cart");
        } else {
            router.push("/login");
        }
    };

    const toggleDropdown = (menu: "product" | "user") => {
        setProductDropdown(menu === "product" ? !productDropdown : false);
        setUserDropdown(menu === "user" ? !userDropdown : false);
    };

    const handleDropdownItemClick = () => {
        setProductDropdown(false);
        setUserDropdown(false);
        setMobileMenuOpen(false);
    };

    return (
        <nav className="bg-neutral-50 nav z-50 relative">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Link href="/" className="text-2xl font-bold text-gray-900 flex items-center">
                        <Image
                            src="/Logo.png"
                            alt="logo"
                            width={64}
                            height={64}
                            className="rounded-md"
                            priority
                        />
                    </Link>

                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden text-gray-700"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                </div>

                <div>
                    <SearchBar/>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="hidden md:flex md:space-x-6 items-center">
                        <Link href="/" className="text-gray-700 hover:text-[#2E50EB] font-semibold">Home</Link>

                        <div className="relative">
                            <button
                                onClick={() => toggleDropdown("product")}
                                className="flex items-center text-gray-700 hover:text-[#2E50EB] font-semibold cursor-pointer"
                            >
                                Products <ChevronDown className="w-4 h-4 ml-1" />
                            </button>

                            {productDropdown && (
                                <div className="absolute mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                    <Link
                                        href="/products"
                                        onClick={handleDropdownItemClick}
                                        className="block px-4 py-2 hover:bg-gray-100"
                                    >
                                        All
                                    </Link>

                                    {categories.map((category) => (
                                        <Link
                                        key={category.id}
                                        href={`/searched-products/${category.slug}`}
                                        onClick={handleDropdownItemClick}
                                        className="block px-4 py-2 hover:bg-gray-100"
                                        >
                                        {category.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {user && (
                            <button onClick={handleCartClick} className="relative">
                                <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-[#2E50EB] cursor-pointer" />
                            </button>
                        )}

                        <div className="relative">
                            <button
                                onClick={() => toggleDropdown("user")}
                                className="flex items-center text-gray-700 hover:text-[#2E50EB] font-semibold cursor-pointer"
                            >
                                <UserCircle className="w-6 h-6" />
                                <ChevronDown className="w-4 h-4 ml-1" />
                            </button>
                            {userDropdown && (
                                <div className="absolute mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                    {!user ? (
                                        <>
                                            <Link href="/login" onClick={handleDropdownItemClick} className="block px-4 py-2 hover:bg-gray-100">Login</Link>
                                            <Link href="/register" onClick={handleDropdownItemClick} className="block px-4 py-2 hover:bg-gray-100">Register</Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link href="/dashboard" onClick={handleDropdownItemClick} className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                                            <button
                                                onClick={handleLogoutClick}
                                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                            >
                                                Logout
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="md:hidden flex flex-col space-y-4 bg-white p-4 shadow-md absolute w-full left-0 top-full z-40">
                    <Link href="/" onClick={handleDropdownItemClick} className="text-gray-700 hover:text-[#2E50EB] font-semibold">Home</Link>

                    <div>
                        <p className="font-semibold text-gray-700">Products</p>
                        <div className="flex flex-col space-y-1 pl-4">
                            <Link
                                href="/products"
                                onClick={handleDropdownItemClick}
                                className="block px-4 py-2 hover:bg-gray-100"
                            >
                                All
                            </Link>

                            {categories.map((category) => (
                                <Link
                                key={category.id}
                                href={`/searched-products/${category.slug}`}
                                onClick={handleDropdownItemClick}
                                className="block px-4 py-2 hover:bg-gray-100"
                                >
                                {category.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {!user ? (
                        <>
                            <Link href="/login" onClick={handleDropdownItemClick} className="text-gray-700 hover:text-[#2E50EB]">Login</Link>
                            <Link href="/register" onClick={handleDropdownItemClick} className="text-gray-700 hover:text-[#2E50EB]">Register</Link>
                        </>
                    ) : (
                        <>
                            <Link href="/dashboard" onClick={handleDropdownItemClick} className="text-gray-700 hover:text-[#2E50EB]">Profile</Link>
                            <button onClick={handleLogoutClick} className="text-left text-gray-700 hover:text-[#2E50EB]">Logout</button>
                        </>
                    )}

                    {user && (
                        <button onClick={handleCartClick} className="relative self-start">
                            <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-[#2E50EB]" />
                        </button>
                    )}
                </div>
            )}
        </nav>
    );
}
