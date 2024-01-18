import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[ZoomClick]',
  standalone: true,
})
export class ZoomClickDirective {
  public zoomFactor = 1.5;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    event.preventDefault();
    this.zoomIn();
  }

  private zoomIn(): void {
    const currentWidth =
      this.el.nativeElement.width || this.el.nativeElement.offsetWidth;
    const currentHeight =
      this.el.nativeElement.height || this.el.nativeElement.offsetHeight;

    const newWidth = currentWidth * this.zoomFactor;
    const newHeight = currentHeight * this.zoomFactor;

    this.renderer.setStyle(this.el.nativeElement, 'width', `${newWidth}px`);
    this.renderer.setStyle(this.el.nativeElement, 'height', `${newHeight}px`);
  }
}
