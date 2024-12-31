import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BurgerMenuComponent } from "./burger-menu/burger-menu.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, BurgerMenuComponent],
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
    this.isLinkContainerVisible = true; // Umschalten der Sichtbarkeit
  }

  onBurgerMenuClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.closest('.linkContainer')) {
        return;
    }
    this.closeHeaderContainer();
}

  closeHeaderContainer() :void {
    this.isLinkContainerVisible = false;
  }
}
