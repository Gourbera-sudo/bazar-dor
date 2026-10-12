
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fff1ed] px-6 py-12">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-2">
        <div className="text-center md:text-left">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.3em] text-red-500">
            Oops! Something went wrong
          </p>

          <h1 className="text-8xl font-black tracking-tight text-red-600 sm:text-9xl">
            404
          </h1>

          <h2 className="mt-3 text-3xl font-bold text-red-950 sm:text-4xl">
            Page Not Found
          </h2>

          <p className="mx-auto mt-5 max-w-md text-base leading-7 text-gray-600 md:mx-0">
            The page you're looking for might have been removed,
            had its name changed, or is temporarily unavailable.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-red-600 px-8 py-4 font-semibold text-white shadow-lg shadow-red-600/25 transition hover:-translate-y-1 hover:bg-red-700"
          >
            <span aria-hidden="true">←</span>
            Back to Home
          </Link>
        </div>
        <div className="relative flex items-center justify-center">
          <div className="absolute h-72 w-72 rounded-full bg-red-200/60 blur-3xl sm:h-96 sm:w-96" />

          <div className="relative flex h-72 w-full max-w-md flex-col items-center justify-center rounded-[2rem] border border-red-200 bg-white/70 shadow-xl shadow-red-200/30 backdrop-blur-sm sm:h-96">
            <div className="text-8xl sm:text-9xl">🔍</div>

            <div className="mt-5 rounded-2xl bg-red-600 px-6 py-3 text-2xl font-black tracking-widest text-white shadow-lg shadow-red-600/20">
              LOST?
            </div>

            <p className="mt-4 text-sm font-medium text-red-400">
              This page seems to be missing!
            </p>
          </div>

          <span className="absolute right-4 top-5 text-4xl text-red-300">
            ✦
          </span>
          <span className="absolute bottom-5 left-4 text-3xl text-red-400">
            ✧
          </span>
        </div>
      </div>
    </div>
  );
};

export default NotFound;