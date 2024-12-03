import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { portfolioProject } from '../shared/ALL_PROJECTS';
import { ProjectComponent } from './project/project.component';


@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, ProjectComponent],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent {
  isJoinHovered = false;
  isPolloLocoHovered = false;
  isPokedexHovered = false;

  allProjects = portfolioProject;
  selectedProject: any = null; // Aktuell ausgewähltes Projekt
  

  // Setzt das aktuell ausgewählte Projekt
  selectProjectByName(projectName: string) {
    this.selectedProject = this.allProjects.find((proj) => proj.name === projectName);
    this.isJoinHovered = false;
    this.isPolloLocoHovered = false;
    this.isPokedexHovered = false;
  }

  // Schließt die Detailansicht
  closeProject() {
    this.selectedProject = null;
  }
}
