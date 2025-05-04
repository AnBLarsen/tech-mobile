import { categories } from "@/helpers/categories";
import { getProductByNameOrCategory } from "@/helpers/productsFetching";
import Card from "../card/Card";

interface Props {
    params: {
      categoryorname: string;
    };
}
  
const Categories = async ({ params }: Props) => {
  const { categoryorname } =  await params;

  const products = await getProductByNameOrCategory(categoryorname);

  const matchedCategory = categories.find((category) =>
      category.slug.toLowerCase() === categoryorname.toLowerCase() ||
      category.keywords?.some((kw) =>
          kw.toLowerCase().includes(categoryorname.toLowerCase())
      )
  );

  return (
    <>
    
      {matchedCategory && (
        <h2 className="text-2xl text-center font-semibold mb-6">
          {matchedCategory.name}
        </h2>
      )}
      <div className="flex justify-center mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.length > 0 ? products.map((product) => {
            return (
              <Card key={product.id} {...product} product={product || {}}  />
            );
          }): <h2 className="text-center text-xl text-gray-600"> Product not found ... 📦</h2>}

        </div>
      </div>
    </>
  );
    
};
  
export default Categories;