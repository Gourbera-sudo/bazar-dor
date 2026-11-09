import Link from "next/link";
import React from "react";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
const Marquee = async ({product}) => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
  );
  const result = await res.json();
  console.log(result);
  return (
    <div className="border border-gray-500 p-2">
      <MarqueeText direction="right" duration={10}>
        {result.map((headline) => (
        <Link key={headline.id} className="hover:underline" href={`/product/${headline.id}`}>
          <span  className="flex gap-2.5">
            <span>{headline.image}</span>
            <span>{headline.nameBn}</span>
            <span>{`${headline.today} টাকা/কেজি`}</span>
            <span>│</span>
          </span>
          </Link>
        ))}
      </MarqueeText>
    </div>
  );
};
export default Marquee;