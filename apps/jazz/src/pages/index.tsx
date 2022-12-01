import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1 className="mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-center text-4xl font-extrabold leading-none tracking-tight text-transparent md:text-5xl lg:text-6xl">
        Party Decorations and More!
      </h1>

      <p className="mb-6 text-lg font-normal text-gray-500 sm:px-16 lg:text-xl xl:px-48">
        Placeholder
      </p>

      <Link
        href="/products"
        className="inline-flex items-center justify-center rounded-lg bg-rose-700 py-3 px-5 text-center text-base font-medium text-white hover:bg-rose-800 focus:ring-4 focus:ring-rose-300"
      >
        View products
        <svg
          className="ml-2 -mr-1 h-5 w-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </Link>
    </div>
  );
}
