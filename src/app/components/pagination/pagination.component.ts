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
  @Input() current: number = 0;
  @Input() total: number = 0;
  @Input() perPage: number = 50;

  @Input() fromRows!: number;
  @Input() toRows!: number;

  @Input() links: any[] = [];

  @Output() goTo: EventEmitter<number> = new EventEmitter<number>();
  @Output() next: EventEmitter<number> = new EventEmitter<number>();
  @Output() previous: EventEmitter<number> = new EventEmitter<number>();
  @Output() onPerPage: EventEmitter<number> = new EventEmitter<number>();

  public pages: number[] = [];

  public onGoTo(page: number): void {
    this.goTo.emit(page);
  }

  public onNext(): void {
    this.next.emit(this.current + 1);
  }

  public onPrevious(): void {
    this.previous.next(this.current - 1);
  }

  getPages() {
    const newLinks = this.links.filter((obj) => {
      if (obj?.label?.includes('Anterior') || obj?.label?.includes('Próximo')) {
        return false;
      }

      return true;
    });

    return newLinks;
  }
}
