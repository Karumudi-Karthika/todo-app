import { Injectable, signal } from '@angular/core';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos = signal<Todo[]>([
    { id: 1, title: 'Learn Angular', completed: false },
    { id: 2, title: 'Build a Todo App', completed: false },
  ]);

  getTodos() {
    return this.todos.asReadonly();
  }

  addTodo(title: string) {
    const current = this.todos();
    const newTodo: Todo = {
      id: current.length ? Math.max(...current.map(t => t.id)) + 1 : 1,
      title,
      completed: false,
    };
    this.todos.set([...current, newTodo]);
  }

  deleteTodo(id: number) {
    this.todos.set(this.todos().filter(t => t.id !== id));
  }

  toggleTodo(id: number) {
    this.todos.set(
      this.todos().map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  }
}
