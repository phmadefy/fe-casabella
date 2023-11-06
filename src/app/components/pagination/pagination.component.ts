import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 0;
  @Input() to: number = 0;
  @Input() from: number = 0;
  @Output() pageChange = new EventEmitter<number>();
  @Output() perPageChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get firstPages(): number[] {
    const pages = [];
    const maxFirstPages = Math.min(5, this.totalPages);
    for (let i = 1; i <= maxFirstPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  get lastPages(): number[] {
    const pages = [];
    const maxLastPages = Math.min(5, this.totalPages);
    for (
      let i = this.totalPages - maxLastPages + 1;
      i <= this.totalPages;
      i++
    ) {
      pages.push(i);
    }
    return pages;
  }

  get pagesToShow(): number[] {
    const pages = [];
    for (let i = this.currentPage - 5; i <= this.currentPage + 5; i++) {
      if (i > 0 && i <= this.totalPages) {
        pages.push(i);
      }
    }
    return pages;
  }

  goToPage(page: number): void {
    if (page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }

  goToFirstPage(): void {
    if (this.currentPage > 1) {
      this.pageChange.emit(1);
    }
  }

  goToLastPage(): void {
    if (this.currentPage < this.totalPages) {
      this.pageChange.emit(this.totalPages);
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }
}
