import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


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
