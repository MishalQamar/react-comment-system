'use client';

import Link from 'next/link';
import { articlePath, episodePath, homePath } from '@/paths';

export default function PageNav() {
  return (
    <nav className="bg-gray-100 shadow px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center gap-6">
        <Link
          href={homePath()}
          className="text-xl font-bold text-gray-800"
        >
          Polymorphic UI
        </Link>
        <Link
          href={articlePath()}
          className="text-gray-700 hover:text-blue-600"
        >
          Article Comments
        </Link>
        <Link
          href={episodePath()}
          className="text-gray-700 hover:text-blue-600"
        >
          Episode Comments
        </Link>
      </div>
    </nav>
  );
}
