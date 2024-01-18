import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[NotContextMenu]',
  standalone: true,
})
export class NotContextMenuDirective {
  @HostListener('contextmenu', ['$event'])
  onRightClick(event: Event): void {
    event.preventDefault();
  }
}
