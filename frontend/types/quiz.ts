import { z } from 'zod';

export const QuestionTypeEnum = z.enum(['BOOLEAN', 'INPUT', 'CHECKBOX']);

export const QuestionSchema = z.object({
  type: QuestionTypeEnum,
  text: z.string().min(1, 'Question text is required'),
  options: z.array(z.string()).optional(),
});

export const QuizFormSchema = z.object({
  title: z.string().min(1, 'Quiz title is required'),
  questions: z.array(QuestionSchema).min(1, 'At least one question is required'),
});

export type QuestionType = z.infer<typeof QuestionTypeEnum>;
export type QuestionFormData = z.infer<typeof QuestionSchema>;
export type QuizFormData = z.infer<typeof QuizFormSchema>;