"use client"
import React from 'react'
import Threads from '@/components/heros/Threads';
import Link from 'next/link';


const HeroHome = () => {
  return (
    <div style={{ width: '100%', height: '600px', position: 'relative' }}>
        <Threads
          amplitude={2}
          distance={0}
          enableMouseInteraction={true}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-wider">TECH MOBILE</h1>
            <p className="mt-2 text-lg md:text-xl">Your hub for the latest in electronics</p>
            <Link href="/products">
              <button className="relative inline-flex items-center justify-center p-0.5 my-6 me-2 overflow-hidden text-md font-bold cursor-pointer text-gray-900 rounded-md group bg-gradient-to-br from-blue-800 to-neutral-900 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-2 focus:outline-none">
                  <span className="relative px-10 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                    Explore
                  </span>
              </button>
            </Link>
        </div>
    </div>
  )
}

export default HeroHome