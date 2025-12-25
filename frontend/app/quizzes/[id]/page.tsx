'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { quizApi, Quiz } from '@/services/api';
import Link from 'next/link';

export default function QuizDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      fetchQuiz(params.id as string);
    }
  }, [params.id]);

  const fetchQuiz = async (id: string) => {
    try {
      setLoading(true);
      const response = await quizApi.getQuiz(id);
      setQuiz(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch quiz');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading quiz...</div>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-red-600 mb-4">Error: {error || 'Quiz not found'}</div>
          <Link
            href="/quizzes"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Back to Quizzes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href="/quizzes"
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Quizzes
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{quiz.title}</h1>
            <p className="text-gray-600">
              {quiz.questions.length} question{quiz.questions.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="space-y-6">
            {quiz.questions.map((question, index) => (
              <div
                key={question.id}
                className="p-6 bg-gray-50 border border-gray-200 rounded-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-medium text-gray-900">
                        {question.text}
                      </h3>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        {getQuestionTypeLabel(question.type)}
                      </span>
                    </div>

                    {question.type === 'BOOLEAN' && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-700">
                          <div className="w-4 h-4 border-2 border-gray-400 rounded-full"></div>
                          <span>True</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <div className="w-4 h-4 border-2 border-gray-400 rounded-full"></div>
                          <span>False</span>
                        </div>
                      </div>
                    )}

                    {question.type === 'INPUT' && (
                      <div className="mt-3">
                        <input
                          type="text"
                          disabled
                          placeholder="Short answer text"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-500"
                        />
                      </div>
                    )}

                    {question.type === 'CHECKBOX' && question.options && (
                      <div className="space-y-2 mt-3">
                        {(question.options as string[]).map((option, optIndex) => (
                          <div key={optIndex} className="flex items-center gap-2 text-gray-700">
                            <div className="w-4 h-4 border-2 border-gray-400 rounded"></div>
                            <span>{option}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function getQuestionTypeLabel(type: string): string {
  switch (type) {
    case 'BOOLEAN':
      return 'True/False';
    case 'INPUT':
      return 'Short Answer';
    case 'CHECKBOX':
      return 'Multiple Choice';
    default:
      return type;
  }
}