import { useRouter } from 'next/router';
import Link from 'next/link';

import React, { useState, useContext } from 'react';

import { CartContext } from '@/components/ContextComponents/CartContext';
import Logo from './Logo';
import Bag from '../Bag';

export default function Navbar() {
  const { pathname } = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const { numItem } = useContext(CartContext);

  return (
    <nav className="border-gray-200 px-2 sm:px-4 py-2.5">
      <div className="container flex flex-wrap md:flex-nowrap items-center justify-between md:justify-start mx-auto">
        <div className="flex md:order-2">
          {/* burger */}
          <button
            onClick={() => setIsOpen((curr) => !curr)}
            data-collapse-toggle="navbar-search"
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-search"
            aria-expanded="false"
          >
            <span className="sr-only">Open menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        <Link href="/" className="md:order-1">
          <Logo />
        </Link>

        <Link href="/cart" className="md:order-last">
          <Bag />
        </Link>

        {/* menu items */}
        <div
          className={`items-center justify-between ${
            isOpen ? '' : 'hidden'
          } w-full md:flex md:w-auto md:order-1 md:grow`}
          id="navbar-search"
        >
          <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
            <MenuItem
              onLinkClick={() => setIsOpen(false)}
              href="/"
              pathname={pathname}
              match="/"
            >
              Home
            </MenuItem>
            <MenuItem
              onLinkClick={() => setIsOpen(false)}
              href="/products"
              pathname={pathname}
              match="/products"
            >
              Products
            </MenuItem>
            <MenuItem
              onLinkClick={() => setIsOpen(false)}
              href="/cart"
              pathname={pathname}
              match="/cart"
            >
              Cart
            </MenuItem>
          </ul>
        </div>
      </div>
    </nav>
  );
}

const MenuItem: React.FC<{
  match: string;
  href: string;
  onLinkClick: () => void;
  pathname: string;
  children: React.ReactNode;
}> = ({ href, onLinkClick, pathname, match, children }) => {
  return (
    <li>
      <Link
        onClick={onLinkClick}
        href={href}
        className={`block py-2 pl-3 pr-4 rounded md:bg-transparent md:text-tertiary md:p-0
          ${pathname === match ? 'text-white bg-playful' : 'text-gray-700'}`}
      >
        {children}
      </Link>
    </li>
  );
};
