'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LucideMenu, X, MessageSquare } from 'lucide-react';
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
    <nav className="bg-white shadow-md px-4 py-3 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-blue-600" />
          <span>Polymorphic Comments</span>
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
          <Link href={articlePath()} className="hover:text-blue-600 transition-colors">
            Article Demo
          </Link>
          <Link href={episodePath()} className="hover:text-blue-600 transition-colors">
            Episode Demo
          </Link>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome, {user.username}</span>
              <form action={SignOut}>
                <Button variant="outline" size="sm">Sign Out</Button>
              </form>
            </div>
          ) : (
            <>
              <Button asChild variant="outline" size="sm">
                <Link href="/sign-in" onClick={toggleMenu}>
                  Sign In
                </Link>
              </Button>
              <Button asChild size="sm">
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
        <div className="md:hidden mt-4 flex flex-col gap-3 px-2 pb-4">
          <Link
            href={articlePath()}
            className="hover:text-blue-600 transition-colors py-2"
            onClick={toggleMenu}
          >
            Article Demo
          </Link>
          <Link
            href={episodePath()}
            className="hover:text-blue-600 transition-colors py-2"
            onClick={toggleMenu}
          >
            Episode Demo
          </Link>
          {user ? (
            <div className="flex flex-col gap-3 pt-2 border-t">
              <span className="text-sm text-gray-600 py-2">Welcome, {user.username}</span>
              <form action={SignOut}>
                <Button
                  type="submit"
                  onClick={toggleMenu}
                  variant="outline"
                  className="w-full"
                >
                  Sign Out
                </Button>
              </form>
            </div>
          ) : (
            <div className="flex flex-col gap-3 pt-2 border-t">
              <Button asChild variant="outline">
                <Link href="/sign-in" onClick={toggleMenu}>
                  Sign In
                </Link>
              </Button>
              <Button asChild>
                <Link href="/sign-up" onClick={toggleMenu}>
                  Sign Up
                </Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
