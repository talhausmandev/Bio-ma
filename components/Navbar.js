"use client"
import Link from 'next/link';
import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-lime-100 p-5">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="logo font-extrabold font-sans text-3xl sm:text-4xl">
          Bio<span className="text-lime-600">.ma</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-5 items-center">
          <li><Link href="/">Home</Link></li>
          <li><Link href="https://talhausman.netlify.app">About</Link></li>
          <li><Link href="https://talhausman.netlify.app">Contact Us</Link></li>
          <li className="bg-lime-500 text-black font-bold py-2 px-3 rounded-2xl">
            <Link href="/create-new-bio">Create new Bio</Link>
          </li>
        </ul>

        {/* Hamburger Button (Mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
          {/* Simple Hamburger Icon */}
          <div className="space-y-1">
            <span className="block w-6 h-0.5 bg-black"></span>
            <span className="block w-6 h-0.5 bg-black"></span>
            <span className="block w-6 h-0.5 bg-black"></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4">
          <ul className="flex flex-col gap-4">
            <li><Link href="/" onClick={() => setIsOpen(false)}>Home</Link></li>
            <li><Link href="https://talhausman.netlify.app" onClick={() => setIsOpen(false)}>About</Link></li>
            <li><Link href="https://talhausman.netlify.app" onClick={() => setIsOpen(false)}>Contact Us</Link></li>
            <li className="bg-lime-500 text-black font-bold py-2 px-3 rounded-2xl w-fit">
              <Link href="/create-new-bio" onClick={() => setIsOpen(false)}>Create new Bio</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
