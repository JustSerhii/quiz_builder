import axios, { AxiosError } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Question {
  id?: string;
  type: 'BOOLEAN' | 'INPUT' | 'CHECKBOX';
  text: string;
  options?: string[];
  order?: number;
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
  createdAt: string;
  updatedAt?: string;
  questionCount: number;
}

export interface QuizListItem {
  id: string;
  title: string;
  questionCount: number;
  createdAt: string;
}

export interface CreateQuizData {
  title: string;
  questions: Question[];
}

export type ApiError = AxiosError<{ message?: string }>;

export const quizApi = {
  createQuiz: (data: CreateQuizData) => api.post<Quiz>('/quizzes', data),
  getQuizzes: () => api.get<QuizListItem[]>('/quizzes'),
  getQuiz: (id: string) => api.get<Quiz>(`/quizzes/${id}`),
  deleteQuiz: (id: string) => api.delete(`/quizzes/${id}`),
};