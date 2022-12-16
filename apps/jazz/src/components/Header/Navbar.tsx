"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import React, { useState } from 'react';

import Logo from './Logo';
import Bag from '../Bag';

export default function Navbar() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-gray-200 px-2 py-2.5 sm:px-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between md:flex-nowrap md:justify-start">
        <div className="flex md:order-2">
          {/* burger */}
          <button
            onClick={() => setIsOpen((curr) => !curr)}
            data-collapse-toggle="navbar-search"
            type="button"
            className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden"
            aria-controls="navbar-search"
            aria-expanded="false"
          >
            <span className="sr-only">Open menu</span>
            <svg
              className="h-6 w-6"
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
          className={`
          ${ isOpen ? 'opacity-1' : 'hidden opacity-0'}
          motion-safe:transition
          items-center justify-between  w-full md:order-1 md:flex md:w-auto md:grow`}
          id="navbar-search"
        >
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium">
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
  pathname: string | null;
  children: React.ReactNode;
}> = ({ href, onLinkClick, pathname, match, children }) => {
  return (
    <li>
      <Link
        onClick={onLinkClick}
        href={href}
        className={`md:text-tertiary block rounded py-2 pl-3 pr-4 md:bg-transparent md:p-0
          ${pathname === match ? 'bg-playful text-white' : 'text-gray-700'}`}
      >
        {children}
      </Link>
    </li>
  );
};
