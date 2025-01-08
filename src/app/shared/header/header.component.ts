import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BurgerMenuComponent } from "./burger-menu/burger-menu.component";
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, BurgerMenuComponent, TranslateModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isLinkContainerVisible: boolean = false;
  
  isEngActive = true;
  isGerActive = false;

  constructor(private translate: TranslateService){
    this.translate.setDefaultLang("en");
  }

  switchLanguage(language: string){
    this.translate.use(language)
  }

  setActiveLanguage(language: string): void {
    if (language === 'en') {
      this.isEngActive = true;
      this.isGerActive = false;
    } else if (language === 'de') {
      this.isEngActive = false;
      this.isGerActive = true;
    }

    this.switchLanguage(language);
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
