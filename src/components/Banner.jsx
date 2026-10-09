import Image from "next/image";
import { connection } from "next/server";
import React from "react";

const Banner = async () => {
  await connection();

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });
  return (
    <div className="w-full bg-[#eef3f0] p-4 sm:p-6 md:p-8">
      <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-3xl border border-gray-200/60 bg-[#f9fbf9] p-6 sm:p-10 md:flex-row md:items-center md:p-12">
        <div className="max-w-2xl space-y-4">
          <div className="inline-block rounded-full bg-[#e2eee6] px-4 py-1.5 text-sm font-medium text-[#0f763e]">
            {date}
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* Subtitle / Description */}
          <p className="text-sm leading-relaxed text-gray-500 sm:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* CTA Button */}
          <div className="pt-2">
            <button
              type="button"
              className="rounded-xl bg-[#038743] px-6 py-3 text-base font-medium text-white shadow-md shadow-emerald-700/20 transition-colors hover:bg-[#026d36] focus:outline-none focus:ring-2 focus:ring-[#038743] focus:ring-offset-2"
            >
              সব পণ্য দেখুন
            </button>
          </div>
        </div>

        
        <div className="flex w-full items-end justify-end">
          <Image
            src="/bazar-hero.png"
            width={400}
            height={400} 
            alt="Market Basket"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
