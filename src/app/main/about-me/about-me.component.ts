import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { aboutMeAnimation } from '../../animation';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
  animations: [aboutMeAnimation],
})
export class AboutMeComponent implements OnInit, OnDestroy {
  startAnimation: boolean = false;
  private observer!: IntersectionObserver;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log('AboutMeComponent is in viewport. Starting animation!');
          this.startAnimation = true;
          this.observer.disconnect();
        }
      },
      { threshold: 0.3 } // 30% Sichtbarkeit erforderlich
    );

    this.observer.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
