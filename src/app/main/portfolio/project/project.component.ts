import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {


  isCloseImageHovered: boolean = false;

  @Input({required: true}) id!: string;
  @Input({required: true}) name!: string;
  @Input({required: true}) description!: string;
  @Input({required: true}) techStack!: string;
  @Input({required: true}) stackLogo!: string;
  @Input({required: true}) image!: string;
  @Input({required: true}) link!: string;
  @Input({required: true}) git!: string;
  @Input() currentIndex!: number; // Aktueller Index des Projekts
  @Output() projectChange = new EventEmitter<number>(); // Event für den Wechsel des Projekts
  @Output() select = new EventEmitter<string>();


  get changeCloseImageSource() {
    if (this.isCloseImageHovered) {
      return '/img/portfolio/closeBlue.svg'
    } else {
      return '/img/portfolio/closeWhite.svg'
    }
  }

  changeProject() {
    const nextIndex = (this.currentIndex + 1) % 4;
    this.projectChange.emit(nextIndex); 
  }
}
