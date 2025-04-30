"use-client"
import { useRouter } from "next/navigation";
import React, { useState } from 'react'
import { Search } from "lucide-react"
import toast from "react-hot-toast";

const SearchBar = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery ] = useState("");
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(searchQuery.length){
            router.push(`/searched-products/${searchQuery}`)
        } else {
            toast.error("Nothing to search")
        }
    }

    return (
        
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mt-4">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-blue-600">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full px-4 py-2 focus:outline-none"
                />
                <button
                    type="submit"
                    className=" text-gray px-2 py-2 transition-all cursor-pointer"
                >
                    <Search className=' hover:text-blue-600'/>
                </button>
            </div>
        </form>

    )
}

export default SearchBar;