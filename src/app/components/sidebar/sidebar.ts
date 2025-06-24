import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  @Output() filterChanged = new EventEmitter<string>();

  categories = ['All', 'Sports', 'Cricket', 'Fashion', 'Technology', 'Health'];

  selectCategory(category: string) {
    this.filterChanged.emit(category);
  }
}
