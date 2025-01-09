import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [ TranslateModule],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss'
})
export class PrivacyComponent implements OnInit {
  mail: string = "info@ufuk-oezsahin.de"

  constructor(private router: Router) { }
  
  
    ngOnInit(): void {
      window.scrollTo(0, 0);
    }
}
