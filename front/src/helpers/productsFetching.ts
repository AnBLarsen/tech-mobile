/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IProduct } from "@/types";
import { categories } from "./categories";

const APIURL = process.env.NEXT_PUBLIC_API_URL

export async function getProducts(): Promise<IProduct[]>{
    try {
        const response = await fetch(`${APIURL}/products`, {
            next: { revalidate: 360 },
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
        }
        const products: IProduct[] = await response.json();
        return products;
    } catch (error:any) {
        console.error("Error fetching products", error);
        return []; 
    }
    
}

export async function getProductById(id: string ): Promise<IProduct>{
    try {
        const response = getProducts()
        const productFound = (await response).find((product) => product.id?.toString() === id)
        if (!productFound) throw new Error(`Product with ID ${id} not found`) 
        return productFound
    } catch (error: any) {
        console.log(`Error fetching product by ID: ${id}`, error);
        throw error; 
    }
}

export async function getProductByNameOrCategory(slugOrName: string): Promise<IProduct[]> {
    try {
        const allProducts = await getProducts();
    
        const matchedCategory = categories.find(
            (category) => category.slug.toLowerCase() === slugOrName.toLowerCase() ||
                category.keywords?.some((kw) =>  kw.toLowerCase().includes(slugOrName.toLowerCase())
            )
        );
    
        if (matchedCategory) {
            return allProducts.filter(
            (product) => product.categoryId === matchedCategory.id
            );
        }
    
        return allProducts.filter((product) =>
            product.name.toLowerCase().includes(slugOrName.toLowerCase())
        );
    } catch (error: any) {
        console.error("Failed to fetch products:", error);
        return [];
    }
}
  
  









































