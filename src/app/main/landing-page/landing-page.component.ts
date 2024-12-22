import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

  email = "info@ufuk-oezsahin.de";

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const scrollContent = this.el.nativeElement.querySelector('.scroll-content');
    const scrollWrapper = this.el.nativeElement.querySelector('.scroll-wrapper');

    if (scrollContent && scrollWrapper) {
      const clonedContent = scrollContent.cloneNode(true);
      this.renderer.appendChild(scrollWrapper, clonedContent);

      const duration = 13; // Sekunden
      this.renderer.setStyle(scrollContent, 'animation-duration', `${duration}s`);
    }
  }
}
