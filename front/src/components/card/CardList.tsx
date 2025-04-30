import { getProducts } from "@/helpers/productsFetching";
import Card from "./Card";

export default async function ProductList() {
  const products = await getProducts();

  return (
    <div className="flex justify-center mt-8 ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.length > 0 ? products.map((product, id) => {
            return (
               
              <Card key={product.id} product={product || {}} />

             
            );
        }) : <h2 className="text-center"> Products comming up soon ...😅 </h2>}
      </div>
    </div>
  );
}


