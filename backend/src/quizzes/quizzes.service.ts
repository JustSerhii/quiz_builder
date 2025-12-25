import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, Quiz } from '@prisma/client';
import { CreateQuizDto } from './dtos/create-quiz.dto';

const prisma = new PrismaClient();

@Injectable()
export class QuizzesService {
  async create(data: CreateQuizDto): Promise<Quiz> {
    return await prisma.quiz.create({
      data: {
        title: data.title,
        questions: {
          create: data.questions.map((q) => ({
            text: q.text,
            type: q.type,
            options: q.options ?? undefined,
            order: q.order,
          })),
        },
      },
      include: { questions: true },
    });
  }

  findAll(): Promise<Quiz[]> {
    return prisma.quiz.findMany({ include: { questions: true } });
  }

  async findOne(id: string): Promise<Quiz> {
    const quiz = await prisma.quiz.findUnique({
      where: { id },
      include: { questions: true },
    });
    if (!quiz) throw new NotFoundException('Quiz not found');
    return quiz;
  }

  async remove(id: string): Promise<Quiz> {
    const quiz = await prisma.quiz.findUnique({ where: { id } });
    if (!quiz) throw new NotFoundException('Quiz not found');
    return prisma.quiz.delete({ where: { id } });
  }
}
