import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  todos: Todo[] = [
    { id: 1, text: 'Buy groceries', completed: false },
    { id: 2, text: 'Walk the dog', completed: true },
    { id: 3, text: 'Read a book', completed: false },
  ];

  newTodoText = '';

  addTodo(): void {
    const text = this.newTodoText.trim();
    if (!text) return;
    this.todos.push({ id: Date.now(), text, completed: false });
    this.newTodoText = '';
  }

  toggleTodo(todo: Todo): void {
    todo.completed = !todo.completed;
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter((t) => t.id !== id);
  }

  get remainingCount(): number {
    return this.todos.filter((t) => !t.completed).length;
  }
}
