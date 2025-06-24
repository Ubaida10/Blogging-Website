import {Component, EventEmitter, Output} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [
    NgClass
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  @Output() filterChanged = new EventEmitter<string>();

  categories = ['All', 'Sports', 'Cricket', 'Fashion', 'Technology', 'Health'];
  selectedCategory: string = 'All';
  selectCategory(category: string) {
    this.selectedCategory = category;
    this.filterChanged.emit(category);
  }
}
