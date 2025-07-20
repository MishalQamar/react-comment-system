'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LucideMenu, X } from 'lucide-react';
import { SignOut } from '@/features/auth/actions/sign-out';
import { articlePath, episodePath } from '@/paths';
import { User } from '@prisma/client';
import { Button } from './ui/button';

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
          {isOpen ? (
            <X size={24} />
          ) : (
            <LucideMenu className="cursor-pointer" size={24} />
          )}
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
              <Button>Sign Out</Button>
            </form>
          ) : (
            <>
              <Button asChild>
                <Link href="/sign-in" onClick={toggleMenu}>
                  Sign In
                </Link>
              </Button>
              <Button asChild>
                <Link href="/sign-up" onClick={toggleMenu}>
                  Sign Up
                </Link>
              </Button>
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
              <Button
                type="submit"
                onClick={toggleMenu}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Sign Out
              </Button>
            </form>
          ) : (
            <>
              <Button asChild>
                <Link href="/sign-in" onClick={toggleMenu}>
                  Sign In
                </Link>
              </Button>
              <Button asChild>
                <Link href="/sign-up" onClick={toggleMenu}>
                  Sign Up
                </Link>
              </Button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
