'use client';

import Link from 'next/link';

export default function EmptyQuizState() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-12 text-center">
      <p className="text-xl text-gray-600 mb-6">No quizzes yet</p>
      <Link
        href="/create"
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Create Your First Quiz
      </Link>
    </div>
  );
}