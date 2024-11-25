import { Component } from '@angular/core';
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { CommonModule } from '@angular/common';
import { AboutMeComponent } from "./about-me/about-me.component";
import { SkillSetComponent } from "./skill-set/skill-set.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [LandingPageComponent, CommonModule, AboutMeComponent, SkillSetComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
