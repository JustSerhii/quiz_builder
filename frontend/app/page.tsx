import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Quiz Builder
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-12">
            Create, manage, and organize your custom quizzes with ease
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/create"
              className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
            >
              Create New Quiz
            </Link>
            <Link
              href="/quizzes"
              className="px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-lg hover:bg-gray-50 transition shadow-lg hover:shadow-xl border-2 border-blue-600"
            >
              View All Quizzes
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2">Multiple Question Types</h3>
              <p className="text-gray-600">
                Create quizzes with True/False, Short Answer, and Multiple Choice questions
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">Easy Management</h3>
              <p className="text-gray-600">
                View, and delete your quizzes with a simple, intuitive interface
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-2">Mobile Responsive</h3>
              <p className="text-gray-600">
                Access and create quizzes on any device - desktop, tablet, or mobile
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}