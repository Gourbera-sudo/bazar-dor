
import Link from "next/link";
import React from "react";


const ProductCard = ({ product }) => {
  return (
    <Link href={`/product/${product.id}`}>
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="text-3xl">{product.image}</span>

        <div>
          <h3 className="font-semibold text-gray-800">
            {product.nameBn}
          </h3>

          <p className="text-sm text-gray-500">
            প্রতি {product.unit === "kg" ? "কেজি" : product.unit}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xl font-bold text-gray-900">
          {product.today} টাকা
        </span>

        <span
          className={`text-sm font-semibold ${
            product.change?.dir === "up"
              ? "text-red-600"
              : product.change?.dir === "down"
                ? "text-green-600"
                : "text-gray-500"
          }`}
        >
          {product.change?.dir === "up"
            ? "▲"
            : product.change?.dir === "down"
              ? "▼"
              : "—"}{" "}
          {product.change?.pct ?? 0}%
        </span>
      </div>

      <p className="mt-2 text-sm text-gray-500">
        গতকাল: {product.yesterday} টাকা
      </p>
    </div>
    </Link>
    
  );
};

export default ProductCard;