import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import NavLinks from "./NavLinks";

const Navbar = async () => {
  await connection();

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <div className=" border-gray-200 bg-white">
      <div className="container mx-auto py-5 sm:px-6 lg:px-8">
        <div className="flex min-h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-green-600 sm:h-10 sm:w-10">
              <Image
                src="/logo-icon.png"
                alt="বাজার দর"
                width={40}
                height={40}
                className="h-full w-full object-contain p-2"
              />
            </div>

            <div className="flex flex-col leading-tight">
              <h1 className="text-3xl font-bold text-gray-800">
                বাজার দর
              </h1>

              <p className="text-[18px] text-gray-500">
                {date}
              </p>
            </div>
          </Link>

          
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="text-[18px] rounded-lg px-3 py-2 font-medium text-gray-700 transition hover:bg-gray-100"
            >
              সাইন ইন
            </Link>

            <Link
              href="/signup"
              className="text-[18px] rounded-lg bg-green-600 px-4 py-2.5 font-semibold text-white shadow-md transition hover:bg-green-700"
            >
              সাইন আপ
            </Link>
          </div>
        </div>
      </div>

      <NavLinks />
    </div>
  );
};

export default Navbar;