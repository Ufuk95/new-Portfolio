import { Directive, HostListener, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[appMouseShadow]',
  standalone: true 
})
export class MouseShadowDirective {
  private shadowElement: HTMLElement;

  constructor(private renderer: Renderer2, private el: ElementRef) {
    // Schatten-Element erstellen
    this.shadowElement = this.renderer.createElement('div');
    this.renderer.setStyle(this.shadowElement, 'position', 'fixed');
    this.renderer.setStyle(this.shadowElement, 'width', '100px');
    this.renderer.setStyle(this.shadowElement, 'height', '100px');
    this.renderer.setStyle(this.shadowElement, 'border-radius', '50%');
    this.renderer.setStyle(this.shadowElement, 'filter', 'blur(35px)');
    this.renderer.setStyle(this.shadowElement, 'background-color', 'rgba(61, 207, 182, 0.5)');
    this.renderer.setStyle(this.shadowElement, 'pointer-events', 'none');
    this.renderer.setStyle(this.shadowElement, 'transform', 'translate(-50%, -50%)');
    this.renderer.setStyle(this.shadowElement, 'z-index', '9999');
    this.renderer.appendChild(document.body, this.shadowElement);
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.renderer.setStyle(this.shadowElement, 'left', `${event.clientX}px`);
    this.renderer.setStyle(this.shadowElement, 'top', `${event.clientY}px`);
  }

  ngOnDestroy(): void {
    this.renderer.removeChild(document.body, this.shadowElement);
  }
}
