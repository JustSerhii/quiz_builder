'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { QuizFormSchema, QuizFormData } from '@/types/quiz';
import { quizApi } from '@/services/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateQuizPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<QuizFormData>({
    resolver: zodResolver(QuizFormSchema),
    defaultValues: {
      title: '',
      questions: [{ type: 'INPUT', text: '', options: [] }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const addQuestion = () => {
    append({ type: 'INPUT', text: '', options: [] });
  };

  const onSubmit = async (data: QuizFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const dataWithOrder = {
        ...data,
        questions: data.questions.map((q, index) => ({
          ...q,
          order: index + 1, 
        })),
      };

      await quizApi.createQuiz(dataWithOrder);
      router.push('/quizzes');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create quiz');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Create New Quiz</h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quiz Title
              </label>
              <input
                {...register('title')}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter quiz title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Questions</h2>
                <button
                  type="button"
                  onClick={addQuestion}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  + Add Question
                </button>
              </div>

              {fields.map((field, index) => (
                <QuestionField
                  key={field.id}
                  index={index}
                  register={register}
                  errors={errors}
                  remove={remove}
                  watch={watch}
                  control={control}
                />
              ))}

              {errors.questions && (
                <p className="text-sm text-red-600">{errors.questions.message}</p>
              )}
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition font-medium"
              >
                {isSubmitting ? 'Creating...' : 'Create Quiz'}
              </button>
              <button
                type="button"
                onClick={() => router.push('/quizzes')}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function QuestionField({ index, register, errors, remove, watch, control }: any) {
  const questionType = watch(`questions.${index}.type`);

  const [options, setOptions] = useState<string[]>(['', '']); 

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleRemoveOption = (optIndex: number) => {
    if (options.length > 1) {
      setOptions(options.filter((_, i) => i !== optIndex));
    }
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-medium text-gray-900">Question {index + 1}</h3>
        {index > 0 && (
          <button
            type="button"
            onClick={() => remove(index)}
            className="text-red-600 hover:text-red-800"
          >
            Remove
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Question Type
          </label>
          <select
            {...register(`questions.${index}.type`)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="INPUT">Short Answer</option>
            <option value="BOOLEAN">True/False</option>
            <option value="CHECKBOX">Multiple Choice</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Question Text
          </label>
          <input
            {...register(`questions.${index}.text`)}
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your question"
          />
          {errors.questions?.[index]?.text && (
            <p className="mt-1 text-sm text-red-600">
              {errors.questions?.[index]?.text?.message}
            </p>
          )}
        </div>

        {questionType === 'CHECKBOX' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Options
            </label>
            <div className="space-y-2">
              {options.map((_, optIndex) => (
                <div key={optIndex} className="flex gap-2">
                  <input
                    {...register(`questions.${index}.options.${optIndex}`)}
                    type="text"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder={`Option ${optIndex + 1}`}
                  />
                  {options.length > 2 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(optIndex)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddOption}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                + Add Option
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}