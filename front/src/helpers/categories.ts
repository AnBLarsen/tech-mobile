import { ICategory } from "@/types";
import { Smartphone, Laptop, Headphones, Home } from "lucide-react";

export const categories: ICategory[] = [
    { 
        id: 1, 
        name: "Smartphone",
        slug: "smartphone",
        icon: Smartphone,
        keywords: ["phones", "smartphones", "cellphones", "mobilephones","mobiles", "cell", "smart"]
    },
    { 
        id: 2,
        name: "Laptops",
        slug: "laptops",
        icon: Laptop,
        keywords: ["computers", "notebooks", "laptops"]
    },
    {
        id: 3,
        name: "Smart Home",
        slug: "smart-home",
        icon: Home,
        keywords: ["home", "smarthome", "smart home", "smart"]
    },
    {
        id: 4,
        name: "Accessories",
        slug: "accessories",
        icon: Headphones,
        keywords: [ "accessories", "smart"]
    },
];

