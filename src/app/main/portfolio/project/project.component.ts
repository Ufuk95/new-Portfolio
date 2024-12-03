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
  @Output() select = new EventEmitter<string>();



  onSelectUser() {
    this.select.emit(this.id);
  }

  get changeCloseImageSource() {
    if (this.isCloseImageHovered) {
      return '/img/portfolio/closeBlue.svg'
    } else {
      return '/img/portfolio/closeWhite.svg'
    }
  }
}
