import { Component, signal } from '@angular/core';
import { AdminCatalog } from './features/admin-catalog/admin-catalog';

@Component({
  selector: 'app-root',
  imports: [AdminCatalog],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('frontend');
}
