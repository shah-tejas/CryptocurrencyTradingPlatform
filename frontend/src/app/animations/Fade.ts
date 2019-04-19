import { trigger, state, transition, style, animate } from '@angular/animations';

export let fadein = trigger('fadein', [
  state('invisible', style({
    opacity: 0
  })),
  state('visible', style({
    opacity: 1
  })),
  transition('invisible => visible', animate('500ms ease-in')),
])

export let fade = trigger('fade', [
  state('*', style({
    opacity: 1
  })),
  transition(':enter', animate('500ms ease-in'))
])
