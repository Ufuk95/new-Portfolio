import { CommonModule } from '@angular/common';
import { Component, Renderer2, HostListener, OnInit } from '@angular/core';
import { portfolioProject } from '../../shared/ALL_PROJECTS';
import { ProjectComponent } from './project/project.component';


@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, ProjectComponent],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  isJoinHovered = false;
  isPolloLocoHovered = false;
  isPokedexHovered = false;
  isSmallScreen = false;

  allProjects = portfolioProject;
  selectedProject: any = null; // Aktuell ausgewähltes Projekt
  currentIndex = 0;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isSmallScreen = window.innerWidth <= 1030;
  }

  // Setzt das aktuell ausgewählte Projekt
  selectProjectByName(projectName: string) {
    this.selectedProject = this.allProjects.find((proj) => proj.name === projectName);
    this.disableScrolling();
    this.isJoinHovered = false;
    this.isPolloLocoHovered = false;
    this.isPokedexHovered = false;
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
