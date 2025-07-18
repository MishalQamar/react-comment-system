'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { SignOut } from '@/features/auth/actions/sign-out';
import { articlePath, episodePath } from '@/paths';
import { User } from '@prisma/client';

type NavbarProps = {
  user: User | null;
};

export default function Navbar({ user }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md px-4 py-3">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-gray-800">
          Polymorphic UI
        </Link>

        {/* Mobile toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-800"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href={articlePath()} className="hover:text-blue-600">
            Article Comments
          </Link>
          <Link href={episodePath()} className="hover:text-blue-600">
            Episode Comments
          </Link>
          {user ? (
            <form action={SignOut}>
              <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                Sign Out
              </button>
            </form>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-3 px-2">
          <Link
            href={articlePath()}
            className="hover:text-blue-600"
            onClick={toggleMenu}
          >
            Article Comments
          </Link>
          <Link
            href={episodePath()}
            className="hover:text-blue-600"
            onClick={toggleMenu}
          >
            Episode Comments
          </Link>
          {user ? (
            <form action={SignOut}>
              <button
                type="submit"
                onClick={toggleMenu}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Sign Out
              </button>
            </form>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                onClick={toggleMenu}
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                onClick={toggleMenu}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
