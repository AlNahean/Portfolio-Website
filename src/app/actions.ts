'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createTodo(formData: FormData) {
  const content = formData.get('content') as string;
  if (!content?.trim()) return;

  await prisma.todo.create({
    data: { content },
  });
  revalidatePath('/todo');
}

export async function toggleTodo(id: string, completed: boolean) {
  await prisma.todo.update({
    where: { id },
    data: { completed: !completed },
  });
  revalidatePath('/todo');
}

export async function deleteTodo(id: string) {
  await prisma.todo.delete({
    where: { id },
  });
  revalidatePath('/todo');
}