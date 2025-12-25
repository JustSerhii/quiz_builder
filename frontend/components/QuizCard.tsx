'use client';

import Link from 'next/link';
import { QuizListItem } from '@/services/api';

interface QuizCardProps {
  quiz: QuizListItem;
  onDelete: (id: string, e: React.MouseEvent) => void;
}

export default function QuizCard({ quiz, onDelete }: QuizCardProps) {
  return (
    <Link
      href={`/quizzes/${quiz.id}`}
      className="block bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 relative group"
    >
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition">
          {quiz.title}
        </h2>
        <button
          onClick={(e) => onDelete(quiz.id, e)}
          className="text-gray-400 hover:text-red-600 transition p-1"
          title="Delete quiz"
          aria-label="Delete quiz"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>

      <div className="flex items-center text-gray-600 mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{quiz.questionCount} questions</span>
      </div>

      <div className="text-sm text-gray-500">
        Created: {new Date(quiz.createdAt).toLocaleDateString()}
      </div>
    </Link>
  );
}