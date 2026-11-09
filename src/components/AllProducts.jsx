import React from "react";
import ProductCard from "./ProductCard";

const AllProducts = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
  );
  const products = await res.json();
  return (
    <div id="all-products" className="bg-[#eef3f0] py-15 scroll-mt-6">
      <div className="container mx-auto mb-5">
        <h2 className="text-xl font-bold text-gray-900">সব পণ্য</h2>
        <p className="text-sm text-gray-500">মোট ৩৩টি পণ্য দেখানো হচ্ছে</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 container mx-auto">
        {products.map((product) => (
            <ProductCard key={product.id} product={product}></ProductCard>
          
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
