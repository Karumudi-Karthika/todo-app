import { Injectable } from '@angular/core';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos: Todo[] = [];
  private nextId = 1;

  constructor() {
    this.loadTodos();
  }

  private saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
    localStorage.setItem('nextId', this.nextId.toString());
  }

  private loadTodos() {
    const storedTodos = localStorage.getItem('todos');
    const storedNextId = localStorage.getItem('nextId');
    if (storedTodos) {
      this.todos = JSON.parse(storedTodos);
    }
    if (storedNextId) {
      this.nextId = parseInt(storedNextId, 10);
    }
  }

  getTodos(): Todo[] {
    return this.todos;
  }

  addTodo(title: string): void {
    if (!title.trim()) return;
    this.todos.push({ id: this.nextId++, title, completed: false });
    this.saveTodos();
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.saveTodos();
  }

  toggleTodoCompletion(id: number): void {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.saveTodos();
    }
  }
}
