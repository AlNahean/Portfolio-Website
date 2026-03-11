'use client';

import { toggleTodo, deleteTodo } from '@/app/actions';
import { useTransition } from 'react';

type TodoProps = {
    id: string;
    content: string;
    completed: boolean;
};

export default function TodoItem({ id, content, completed }: TodoProps) {
    const [isPending, startTransition] = useTransition();

    return (
        <div className="group flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm mb-3 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={() => startTransition(() => toggleTodo(id, completed))}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                />

                <span className={`text-base ${completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                    {content}
                </span>
            </div>

            <button
                onClick={() => startTransition(() => deleteTodo(id))}
                disabled={isPending}
                className="text-sm font-medium text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded transition-colors"
            >
                {isPending ? 'Processing...' : 'Delete'}
            </button>
        </div>
    );
}