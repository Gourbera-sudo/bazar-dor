import React from 'react';
import ProductCard from './ProductCard';

const PriceIncreasedProducts = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    { cache: "no-store" } // dynamic fetch
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const result = await res.json();

  // API likely returns { data: [...] }
  const products = result.filter(
    (product) => product.change.dir === "up" && product.change.pct >= 0
  );

  return (
    <div className="bg-[#eef3f0] py-15">
      <div className="container mx-auto mb-5">
        <h2 className="text-xl font-bold text-gray-900"><span className='text-red-600'>▲</span>আজ দাম বেড়েছে</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 container mx-auto">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default PriceIncreasedProducts;
