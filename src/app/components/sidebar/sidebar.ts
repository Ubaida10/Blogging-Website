import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  imports: [
    NgClass
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Sidebar {
  @Input() selectedCategory: string = 'All';
  @Output() filterChanged = new EventEmitter<string>();

  categories = ['All', 'Sports', 'Cricket', 'Fashion', 'Technology', 'Health'];
  selectCategory(category: string) {
    this.filterChanged.emit(category);
  }
}
