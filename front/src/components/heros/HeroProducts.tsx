import { Button } from "@headlessui/react";
import Image from "next/image";
import { div as MotionDiv } from "motion/react-client";

export default function HeroProducts() {
    return (
        <section className="flex justify-center items-center py-10 px-4">
            <div className="relative w-full max-w-7xl bg-neutral-100 shadow-lg rounded-3xl overflow-hidden flex items-center">
                
                <MotionDiv
                    initial={{ y: 200, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 60, damping: 20 }}
                    className="relative w-[80%] h-96 hidden md:block rounded-l-3xl overflow-hidden"
                >
                    <Image
                        src="https://lh3.googleusercontent.com/1QfAfqLlVYB8RPECTTXgvF_FTzL0f_FyMDW_GqZIpXi_OlbyGS1K8Lus3fRqVEInuQFG1TZUSCctCCTVIq5yOJsXFJsVUEuQ0JU=s3000-w3000-e365-rw-v0-nu"
                        alt="Hero Background"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain"
                        priority
                    />
                </MotionDiv>

                <div className="w-full md:w-[70%] p-8 text-center md:text-left">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
                        Discover Tech
                    </h1>
                    <p className="mt-4 text-gray-600">
                        Shop the latest Google devices with AI technology.
                    </p>
                    <Button className="rounded bg-[#2E50EB] mt-5 py-2 px-8 text-sm text-white font-bold data-[hover]:bg-[#5C77EF] data-[hover]:data-[active]:bg-[#1437D1] cursor-pointer">
                        Explore
                    </Button>
                </div>
            </div>
        </section>
    );
}
