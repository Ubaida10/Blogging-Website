import {Component, EventEmitter, Output} from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [
    NgForOf
  ],
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
