import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  isCheckboxHovered = false;
  isCheckboxChecked = false;
  formSubmitted = false;
  showNotification = false;
  errorMessage = '';

  contactData: { name: string; email: string; message: string } = {
    name: '',
    email: '',
    message: '',
  };

  http = inject(HttpClient);

  post = {
    endPoint: 'https://ufuk-oezsahin.de/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

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

  isFormValid(form: NgForm): boolean {
    return form.form.valid && this.isCheckboxChecked;
  }

  handleButtonClick(form: NgForm): void {
    this.formSubmitted = true; // Markiere das Formular als "abgesendet"
    
    // Markiere alle Felder als "touched", um Fehlermeldungen anzuzeigen
    Object.keys(form.controls).forEach((field) => {
      const control = form.controls[field];
      control.markAsTouched();
    });
  
    if (this.isFormValid(form)) {
      // Wenn das Formular gültig ist, senden wir es ab
      this.onSubmit(form);
    } else {
      console.warn('Form is invalid. Please check the fields.');
    }
  }
  
  
  

  onSubmit(form: NgForm): void {
    // Setzt die Variable formSubmitted auf true, um die Validierung anzuzeigen
    this.formSubmitted = true;
  
    if (this.isFormValid(form)) {
      // Wenn das Formular gültig ist und die Checkbox aktiv ist, absenden
      this.http.post(this.post.endPoint, this.post.body(this.contactData), this.post.options).subscribe({
        next: () => {
          this.showNotification = true;
          this.errorMessage = '';
          this.resetFormState(form); // Formular und Zustände vollständig zurücksetzen
  
          setTimeout(() => {
            this.showNotification = false;
          }, 2000);
        },
        error: (error) => {
          console.error('Error:', error);
          this.errorMessage = 'An error occurred. Please try again later.';
          this.resetFormState(form);
        },
      });
    } else {
      // Wenn das Formular oder die Checkbox ungültig ist, eine Fehlermeldung ausgeben
      if (!this.isCheckboxChecked) {
        console.warn('Checkbox not checked. Showing warning message.');
      }
    }
  }
  
  // Hilfsfunktion zum Zurücksetzen der Formularzustände
  private resetFormState(form: NgForm): void {
    form.resetForm(); // Eingabefelder und Validierungszustände zurücksetzen
    this.contactData = { name: '', email: '', message: '' }; // Sicherstellen, dass die Daten leer sind
    this.isCheckboxChecked = false; // Checkbox zurücksetzen
    this.formSubmitted = false; // Validierungsstatus zurücksetzen, um Fehlermeldungen zu vermeiden
  }
  
  
  
   
}
