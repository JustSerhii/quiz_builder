'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PlusCircle, List } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: '/quizzes', label: 'All Quizzes', icon: List },
    { href: '/create', label: 'Create Quiz', icon: PlusCircle },
  ];

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/quizzes" className="flex items-center space-x-3">
              <div className="text-2xl font-bold text-indigo-600">QuizBuilder</div>
            </Link>
          </div>

          <div className="flex items-center space-x-8">
            {links.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === href
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}