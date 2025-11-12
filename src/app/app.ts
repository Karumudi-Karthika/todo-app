import { Component } from '@angular/core';
import { TodosComponent } from './todos/todos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TodosComponent],
  template: `<app-todos></app-todos>`,
})
export class AppComponent {}

