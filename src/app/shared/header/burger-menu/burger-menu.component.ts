import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-burger-menu',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './burger-menu.component.html',
  styleUrl: './burger-menu.component.scss'
})
export class BurgerMenuComponent {
  
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
}
