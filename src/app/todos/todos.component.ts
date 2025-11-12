import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="todo-container">
      <h1>📝 My Todo List</h1>

      <form (submit)="addTodo(); $event.preventDefault()">
        <input
          type="text"
          [(ngModel)]="newTodo"
          name="todo"
          placeholder="Add new task"
          required
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        <li *ngFor="let todo of todos()">
          <label>
            <input
              type="checkbox"
              [checked]="todo.completed"
              (change)="toggle(todo.id)"
            />
            <span [class.completed]="todo.completed">{{ todo.title }}</span>
          </label>
          <button (click)="delete(todo.id)">❌</button>
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .todo-container {
      max-width: 400px;
      margin: 3rem auto;
      background: #f7f7f7;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    h1 { text-align: center; margin-bottom: 1.5rem; }
    form { display:flex; gap:.5rem; margin-bottom:1rem; }
    input[type="text"] { flex:1; padding:.5rem; border:1px solid #ccc; border-radius:6px; }
    button { background:#1976d2; color:#fff; border:none; border-radius:6px; padding:.5rem 1rem; cursor:pointer; }
    ul { list-style:none; padding:0; }
    li { display:flex; justify-content:space-between; align-items:center; padding:.4rem 0; border-bottom:1px solid #eee; }
    .completed { text-decoration:line-through; color:#777; }
  `]
})
export class TodosComponent implements OnInit {
  newTodo = '';
  // this will be assigned to the readonly signal returned by the service
  todos: any;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    // assign the signal after the service is available
    this.todos = this.todoService.getTodos();
  }

  addTodo() {
    if (!this.newTodo.trim()) return;
    this.todoService.addTodo(this.newTodo.trim());
    this.newTodo = '';
  }

  delete(id: number) {
    this.todoService.deleteTodo(id);
  }

  toggle(id: number) {
    this.todoService.toggleTodo(id);
  }
}
