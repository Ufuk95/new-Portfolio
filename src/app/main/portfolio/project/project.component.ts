import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core'; 
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  isCloseImageHovered: boolean = false;

  @Input() id!: string;
  @Input() name!: string;
  
  // Beschreibung wird als Objekt mit en und de erwartet
  @Input() description!: { en: string; de: string };
  
  @Input() techStack!: string[];
  @Input() stackLogo!: string[];
  @Input() image!: string;
  @Input() link!: string;
  @Input() git!: string;
  @Input() currentIndex!: number;
  
  @Output() projectChange = new EventEmitter<number>();
  @Output() select = new EventEmitter<string>();

  // Standardwert für currentLanguage auf 'en'
  currentLanguage: 'en' | 'de' = 'en'; 

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    // Setze die Standard-Sprache auf Englisch, wenn noch keine Sprache gesetzt wurde
    if (!this.translate.currentLang) {
      this.translate.use('en');
    }

    // Übernehme die aktuelle Sprache von TranslateService
    this.currentLanguage = this.translate.currentLang as 'en' | 'de'; 
  }

  get translatedDescription() {
    // Rückgabe der Beschreibung basierend auf der aktuellen Sprache
    return this.description[this.currentLanguage]; 
  }

  get changeCloseImageSource() {
    return this.isCloseImageHovered ? '/img/portfolio/closeBlue.svg' : '/img/portfolio/closeWhite.svg';
  }

  changeProject() {
    const nextIndex = (this.currentIndex + 1) % 4;
    this.projectChange.emit(nextIndex);
  }
}
