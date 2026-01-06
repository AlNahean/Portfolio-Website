import prisma from '@/lib/prisma';
import { createTodo } from '@/app/actions';
import TodoItem from './_components/todo-item';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function TodoPage() {
    const todos = await prisma.todo.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">

            {/* --- NAVIGATION BAR --- */}
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <span className="text-xl font-bold text-blue-600">PrismaList</span>
                        </div>
                        <div className="flex items-center space-x-6">
                            <Link href="/" className="text-gray-500 hover:text-gray-900 text-sm font-medium">Home</Link>
                            <Link href="/todo" className="text-blue-600 text-sm font-medium">Todo App</Link>
                            <Link href="#" className="text-gray-500 hover:text-gray-900 text-sm font-medium">Settings</Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* --- MAIN CONTENT --- */}
            <main className="max-w-2xl mx-auto px-4 pt-10 pb-20">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
                    <p className="text-gray-500 mt-1">Manage your daily goals.</p>
                </div>

                {/* INPUT FORM */}
                <form action={createTodo} className="flex gap-3 mb-8">
                    <input
                        type="text"
                        name="content"
                        placeholder="What needs to be done?"
                        required
                        className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3 text-gray-900 border"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Add Task
                    </button>
                </form>

                {/* LIST */}
                <div className="space-y-1">
                    {todos.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
                            <p className="text-gray-500">No tasks yet. Add one above!</p>
                        </div>
                    ) : (
                        todos.map((todo) => (
                            <TodoItem
                                key={todo.id}
                                id={todo.id}
                                content={todo.content}
                                completed={todo.completed}
                            />
                        ))
                    )}
                </div>

            </main>
        </div>
    );
}