import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="todo-container">
      <h1>📝 My Todo List</h1>

      <div class="input-section">
        <input
          [(ngModel)]="newTodoTitle"
          placeholder="Add a new item"
          (keyup.enter)="addTodo()"
          style="width: 340px; border-radius: 10px;"
        />
        <button (click)="addTodo()">ADD</button>
      </div>

      <ul>
        <li *ngFor="let todo of todos">
          <input
            type="checkbox"
            [checked]="todo.completed"
            (change)="toggleTodoCompletion(todo.id)"
          />
          <span [class.completed]="todo.completed">{{ todo.title }}</span>
          <button (click)="deleteTodo(todo.id)">DELETE</button>
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .todo-container {
      width: 450px;
      margin: 20px auto;
      font-family: Arial, sans-serif;
      text-align: center;
    }
    h1 { 
      text-align: center; 
      margin-bottom: 1.5rem; 
    }
    .input-section {
      margin: 20px auto;
      padding: 20px 20px 10px 5px;
      display:flex; 
      gap:.5rem; 
    }
    input[type="text"] {
      padding: 8px;
      width: 70%;
    }
    button {
      margin-left: 5px;
      padding: 8px 12px;
      cursor: pointer;
      border-radius: 10px;
      background-color: #1581f4ff;
      border: none;
      transition: background-color 0.3s;
    }
      btn:hover {
        background-color: #000408ff; 
      }
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
      background: #f4f4f4;
      padding: 8px;
      border-radius: 10px;
    }
    .completed {
      text-decoration: line-through;
      color: gray;
    }
  `],
})
export class TodosComponent {
  todos: Todo[] = [];
  newTodoTitle = '';

  constructor(private todoService: TodoService) {
    this.loadTodos();
  }

  loadTodos() {
    this.todos = this.todoService.getTodos();
  }

  addTodo() {
    if (!this.newTodoTitle.trim()) return;
    this.todoService.addTodo(this.newTodoTitle);
    this.newTodoTitle = '';
    this.loadTodos();
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id);
    this.loadTodos();
  }

  toggleTodoCompletion(id: number) {
    this.todoService.toggleTodoCompletion(id);
    this.loadTodos();
  }
}
