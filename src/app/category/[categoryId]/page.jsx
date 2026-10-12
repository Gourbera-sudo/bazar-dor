const CategoryPage = async ({ params }) => {
  const { categoryId } = await params;

  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const result = await res.json();

  
  const products = result.filter(
    (product) => product.category === categoryId
  );

  const categoryName = products[0]?.categoryNameBn || categoryId;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        {categoryName}
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
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
                  product.change.dir === "up"
                    ? "text-red-600"
                    : product.change.dir === "down"
                      ? "text-green-600"
                      : "text-gray-500"
                }`}
              >
                {product.change.dir === "up" ? "▲" : product.change.dir === "down" ? "▼" : "—"}{" "}
                {product.change.pct}%
              </span>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              গতকাল: {product.yesterday} টাকা
            </p>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <p className="text-gray-500">
          এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
        </p>
      )}
    </div>
  );
};

export default CategoryPage;