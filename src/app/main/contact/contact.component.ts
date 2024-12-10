import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  isCheckboxHovered: boolean = false;
  isCheckboxChecked: boolean = false;

  get CheckboxImage(): string {
    if (this.isCheckboxChecked) {
      return this.isCheckboxHovered 
        ? '/img/contact/checkedHover.svg' 
        : '/img/contact/checked.svg';
    } else {
      return this.isCheckboxHovered 
        ? '/img/contact/checkBoxHover.svg' 
        : '/img/contact/checkBox.svg';
    }
  }

  toggleCheckbox(): void {
    this.isCheckboxChecked = !this.isCheckboxChecked;
  }
}
