import { categories } from "@/helpers/categories";
import Card from "../card/Card";

interface Props {
  categoryorname: string;
  products: any[];
}

const Categories = ({ categoryorname, products }: Props) => {
 
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
          {products?.length > 0 ? (
            products.map((product) => (
              <Card key={product.id} product={product} />
            ))
          ) : (
            <h2 className="text-center text-xl text-gray-600">Product not found ... 📦</h2>
          )}
        </div>
      </div>
    </>
  );
};

export default Categories;
