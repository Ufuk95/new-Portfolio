import { Component } from '@angular/core';
import { LandingPageComponent } from "./landing-page/landing-page.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [LandingPageComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
