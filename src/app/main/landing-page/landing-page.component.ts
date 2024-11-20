import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';


@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  isEngActive = true;
  isGerActive = false;

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

  // startAnimation(event: MouseEvent) {
  //   const target = (event.target as HTMLElement).querySelector('p');
  //   if (target) {
  //     // Animation hinzufügen
  //     this.renderer.setStyle(target, 'animation', 'text-slide 2s linear infinite');
  //   }
  // }

  // stopAnimation(event: MouseEvent) {
  //   const target = (event.target as HTMLElement).querySelector('p');
  //   if (target) {
  //     // Animation entfernen
  //     this.renderer.removeStyle(target, 'animation');
  //   }
  // }

  setActiveLanguage(language: string): void {
    if (language === 'EN') {
      this.isEngActive = true;
      this.isGerActive = false;
    } else if (language === 'DE') {
      this.isEngActive = false;
      this.isGerActive = true;
    }
  }
}
