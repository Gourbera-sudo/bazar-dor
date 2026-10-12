import Link from "next/link";
import React from "react";

const NavLinks = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
  );
  const categories = await res.json();

  return (
    <div className="flex gap-10 container mx-auto py-7">
      {categories.map((category) => (
        <Link
          href={`/category/${category.slug}`}
          key={category.id}
          className="flex gap-2"
        >
          <span>{category.icon}</span>
          <span>{category.nameBn}</span>
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
