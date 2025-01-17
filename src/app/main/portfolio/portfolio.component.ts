import { CommonModule } from '@angular/common';
import { Component, Renderer2, HostListener, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { portfolioProject } from '../../shared/ALL_PROJECTS';
import { ProjectComponent } from './project/project.component';
import { TranslateModule } from '@ngx-translate/core';
import { portfolioAnimation } from '../../animation';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, ProjectComponent, TranslateModule],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  animations: [portfolioAnimation],
})
export class PortfolioComponent implements OnInit, OnDestroy {
  startAnimation = false;

  isJoinHovered = false;
  isPolloLocoHovered = false;
  isPokedexHovered = false;
  isSmallScreen = false;
  isPortfolioHovered = false;

  allProjects = portfolioProject;
  selectedProject: any = null; // Aktuell ausgewähltes Projekt
  currentIndex = 0;
  private observer!: IntersectionObserver; // Intersection Observer

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnInit() {
    this.checkScreenSize();
    this.observePortfolioSection();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect(); // Cleanup
    }
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isSmallScreen = window.innerWidth <= 1250;
  }

  // Beobachtet, ob der Portfolio-Bereich im Viewport sichtbar wird
  private observePortfolioSection() {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log('PortfolioComponent is in viewport. Starting animation!');
          this.startAnimation = true; // Animation starten
          this.observer.disconnect(); // Beobachtung beenden
        }
      },
      { threshold: 0.4 } // 40% Sichtbarkeit erforderlich
    );

    this.observer.observe(this.elementRef.nativeElement); // Beobachte die Komponente
  }

  // Setzt das aktuell ausgewählte Projekt
  selectProjectByName(projectName: string) {
    this.selectedProject = this.allProjects.find((proj) => proj.name === projectName);
    this.disableScrolling();
    this.isJoinHovered = false;
    this.isPolloLocoHovered = false;
    this.isPokedexHovered = false;
    this.isPortfolioHovered = false;
  }

  // Schließt die Detailansicht
  closeProject() {
    this.selectedProject = null;
    this.enableScrolling();
  }

  disableScrolling() {
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
  }

  enableScrolling() {
    this.renderer.removeStyle(document.body, 'overflow');
  }

  // Wechsel zum nächsten Projekt
  onProjectChange(index: number) {
    this.currentIndex = index;
    this.selectedProject = this.allProjects[this.currentIndex];
  }
}