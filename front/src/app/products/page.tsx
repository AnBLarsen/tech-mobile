import CardList from "@/components/card/CardList";
import HeroProducts from "@/components/heros/HeroProducts";


export default function ProductsPage (){
    return(
        <>
            <HeroProducts/>
            <h2 className="text-center font-bold text-2xl mt-2">Our Products</h2>
            <CardList/>
        
        </>
    )
    
}