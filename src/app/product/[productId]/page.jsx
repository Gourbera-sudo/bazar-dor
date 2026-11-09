import React from "react";

const ProductDetails = async ({ params }) => {
  const { productId } = await params;
  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products/${productId}`,
  );
  const product = await res.json();
  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">{product.categoryIcon}</span>
          <h1 className="text-2xl font-bold text-gray-900">{product.nameBn}</h1>
          <span className="ml-2 text-sm text-gray-500">
            ({product.categoryNameBn})
          </span>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm mb-8">
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold text-gray-800">
              আজকের গড় দাম: {product.today} টাকা / {product.unit}
            </span>
            <span
              className={`text-sm font-semibold ${
                product.change.dir === "up"
                  ? "text-red-600"
                  : product.change.dir === "down"
                    ? "text-green-600"
                    : "text-gray-500"
              }`}
            >
              {product.change.dir === "up"
                ? "▲"
                : product.change.dir === "down"
                  ? "▼"
                  : "—"}{" "}
              {product.change.pct}%
            </span>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-500">গতকাল</p>
              <p className="font-bold text-gray-800">
                {product.yesterday} টাকা
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">গত সপ্তাহে</p>
              <p className="font-bold text-gray-800">{product.lastWeek} টাকা</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">গত মাসে</p>
              <p className="font-bold text-gray-800">
                {product.lastMonth} টাকা
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-lg font-bold text-gray-900 mb-4">
          বাজারভিত্তিক আজকের দাম
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 bg-white rounded-xl shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  বাজার
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  বিভাগ
                </th>
                <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">
                  সর্বনিম্ন
                </th>
                <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">
                  সর্বাধিক
                </th>
              </tr>
            </thead>
            <tbody>
              {product.markets.map((m, idx) => (
                <tr key={idx} className="border-t">
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {m.market}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    {m.division}
                  </td>
                  <td className="px-4 py-2 text-sm text-center text-gray-800">
                    {m.min} টাকা
                  </td>
                  <td className="px-4 py-2 text-sm text-center text-gray-800">
                    {m.max} টাকা
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
