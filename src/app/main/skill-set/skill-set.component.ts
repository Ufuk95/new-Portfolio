import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { skillSetAnimation } from '../../animation';

@Component({
  selector: 'app-skill-set',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './skill-set.component.html',
  styleUrl: './skill-set.component.scss',
  animations: [skillSetAnimation],
})
export class SkillSetComponent implements OnInit, OnDestroy {
  startAnimation: boolean = false; // Steuerung der Animation
  private observer!: IntersectionObserver; // Intersection Observer

  hoveredImage: { src: string; name: string } | null = null;

  skillImages: { src: string; name: string }[] = [
    { src: '/img/skillset/angular.svg', name: 'Angular' },
    { src: '/img/skillset/typescript.svg', name: 'Typescript' },
    { src: '/img/skillset/javascript.svg', name: 'Javascript' },
    { src: '/img/skillset/html.svg', name: 'HTML' },
    { src: '/img/skillset/firebase.svg', name: 'Firebase' },
    { src: '/img/skillset/git.svg', name: 'GIT' },
    { src: '/img/skillset/css.svg', name: 'CSS' },
    { src: '/img/skillset/api.svg', name: 'Rest-Api' },
    { src: '/img/skillset/scrum.svg', name: 'Scrum' },
    { src: '/img/skillset/material-design.svg', name: 'Material design' },
    { src: '/img/skillset/mindset.svg', name: 'Growth mindset' },
  ];

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log('SkillSetComponent is in viewport. Starting animation!');
          this.startAnimation = true; // Animation starten
          this.observer.disconnect(); // Beobachtung beenden
        }
      },
      { threshold: 0.3 } // 30% Sichtbarkeit erforderlich
    );

    this.observer.observe(this.elementRef.nativeElement); // Beobachte die Komponente
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect(); // Cleanup
    }
  }

  onHover(image: { src: string; name: string } | null): void {
    if (image?.name === 'Growth mindset') {
      this.hoveredImage = image;
    } else {
      this.hoveredImage = null;
    }
  }
}
