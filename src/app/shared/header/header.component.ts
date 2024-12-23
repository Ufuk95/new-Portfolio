import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isLinkContainerVisible: boolean = false;
  
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

  openHeaderContainer(): void {
    this.isLinkContainerVisible = !this.isLinkContainerVisible; // Umschalten der Sichtbarkeit
  }
}
