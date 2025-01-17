import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, Renderer2, HostListener, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { contactAnimation } from '../../animation';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, TranslateModule, RouterLink],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [contactAnimation]
})
export class ContactComponent implements OnInit, OnDestroy {
  isCheckboxHovered = false;
  isCheckboxChecked = false;
  formSubmitted = false;
  showNotification = false;
  errorMessage = '';
  startAnimation = false;

  contactData: { name: string; email: string; message: string } = {
    name: '',
    email: '',
    message: '',
  };

  http = inject(HttpClient);
  private observer!: IntersectionObserver;

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

  constructor(private translate: TranslateService, private elementRef: ElementRef) { }


  ngOnInit() {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log('contactComponent is in viewport. Starting animation!');
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
      this.observer.disconnect();
    }
  }

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
    this.formSubmitted = true;

    if (this.isFormValid(form)) {
      this.http.post(this.post.endPoint, this.post.body(this.contactData), this.post.options).subscribe({
        next: () => {
          this.showNotification = true;
          this.errorMessage = '';
          this.resetFormState(form);

          setTimeout(() => {
            this.showNotification = false;
          }, 2000);
        },
        error: (error) => {
          console.error('Error:', error);
          // Setze die übersetzte Fehlermeldung
          this.translate.get('CONTACT.CHECKBOX.ERROR').subscribe((translation: string) => {
            this.errorMessage = translation;
          });
          this.resetFormState(form); // sollte später wieder gelöscht werden nachdem das senden funktioniert 
        },
      });
    } else {
      if (!this.isCheckboxChecked) {
        console.warn('Checkbox not checked. Showing warning message.');
      }
    }
  }

  private resetFormState(form: NgForm): void {
    form.resetForm();
    this.contactData = { name: '', email: '', message: '' };
    this.isCheckboxChecked = false;
    this.formSubmitted = false;
  }
}
