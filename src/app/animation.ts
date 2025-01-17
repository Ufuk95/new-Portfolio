import { trigger, transition, style, animate, state, keyframes } from '@angular/animations';

export const aboutMeAnimation = trigger('aboutMeAnimation', [
  state('void', style({ opacity: 0, transform: 'translateY(70px)' })),
  state('start', style({ opacity: 1, transform: 'translateY(0)' })),
  transition('void => start', [
    animate('1000ms ease-in-out') // Längere und deutliche Animation
  ]),
]);


export const skillSetAnimation = trigger('skillSetAnimation', [
  state('void', style({ opacity: 0, transform: 'scale(0.8) rotate(-5deg)' })), // Startzustand
  state('start', style({ opacity: 1, transform: 'scale(1) rotate(0deg)' })), // Endzustand

  transition('void => start', [
    animate(
      '1200ms ease-out',
      keyframes([
        style({ opacity: 0, transform: 'scale(0.8) rotate(-10deg)', offset: 0 }), // Start
        style({ opacity: 0.6, transform: 'scale(1.05) rotate(4deg)', offset: 0.5 }), // Übertreibung
        style({ opacity: 1, transform: 'scale(1) rotate(0deg)', offset: 1 }), // Zielzustand
      ])
    )
  ]),
]);


export const portfolioAnimation = trigger('portfolioAnimation', [
  state('void', style({ opacity: 0, transform: 'scale(0.9) translateY(20px)' })), // Startzustand: leicht kleiner und nach unten verschoben
  state('start', style({ opacity: 1, transform: 'scale(1) translateY(0)' })), // Endzustand: Originalgröße und in Position

  transition('void => start', [
    animate(
      '1200ms ease-in-out', // Sanfte, entspannte Kurve
      keyframes([
        style({ opacity: 0, transform: 'scale(0.9) translateY(20px)', offset: 0 }), // Anfang
        style({ opacity: 0.5, transform: 'scale(1) translateY(10px)', offset: 0.6 }), // Zwischenzustand
        style({ opacity: 1, transform: 'scale(1) translateY(0)', offset: 1 }), // Endzustand
      ])
    ),
  ]),
]);




export const contactAnimation = trigger('contactAnimation', [
  state('void', style({ opacity: 0, transform: 'rotateX(90deg)' })), // Startzustand: Unsichtbar und gedreht
  state('start', style({ opacity: 1, transform: 'rotateX(0)' })), // Endzustand: Sichtbar und in Position

  transition('void => start', [
    animate(
      '1000ms ease-out', // Sanfter Übergang
      keyframes([
        style({ opacity: 0, transform: 'rotateX(90deg)', offset: 0 }), // Anfang: Drehen und unsichtbar
        style({ opacity: 0.5, transform: 'rotateX(30deg)', offset: 0.6 }), // Zwischenphase: Teilweise gedreht, leicht sichtbar
        style({ opacity: 1, transform: 'rotateX(0)', offset: 1 }), // Endphase: Fertig gedreht und sichtbar
      ])
    ),
  ]),
]);

