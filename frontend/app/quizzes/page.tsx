'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { quizApi, QuizListItem, ApiError } from '@/services/api';
import QuizCard from '@/components/QuizCard';
import EmptyQuizState from '@/components/EmptyQuizState';

function LoadingState() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-xl text-gray-600">Loading quizzes...</div>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-xl text-red-600">Error: {message}</div>
    </div>
  );
}

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<QuizListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        const response = await quizApi.getQuizzes();
        setQuizzes(response.data);
      } catch (err) {
        const apiError = err as ApiError;
        setError(apiError.response?.data?.message || apiError.message || 'Failed to fetch quizzes');
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // if (!confirm('Are you sure you want to delete this quiz?')) return;

    try {
      await quizApi.deleteQuiz(id);
      setQuizzes((prev) => prev.filter((q) => q.id !== id));
    } catch (err) {
      const apiError = err as ApiError;
      alert(apiError.response?.data?.message || 'Failed to delete quiz');
    }
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">All Quizzes</h1>
          <Link
            href="/create"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            + Create New Quiz
          </Link>
        </div>

        {quizzes.length === 0 ? (
          <EmptyQuizState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}