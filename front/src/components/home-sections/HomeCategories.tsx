"use-client"

import Link from "next/link";
import {categories} from "../../helpers/categories"

export default function HomeCategories() {
  return (
    <section className="py-6 px-4 max-w-6xl mx-auto">
      <h2 className="text-center text-2xl font-bold mb-8">Shop by Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {categories.map((cat) => (
        <Link
          key={cat.name}
          href={`/searched-products/${cat.slug}`}
          className="bg-neutral-50 rounded-xl shadow p-6 hover:shadow-lg transition cursor-pointer">
          <div> 
            <div className="text-blue-600 mb-3 flex justify-center ">
              <cat.icon className="hidden sm:block w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold">{cat.name}</h3>
          </div>
        </Link>
      ))}
      </div>
    </section>
  );
}



