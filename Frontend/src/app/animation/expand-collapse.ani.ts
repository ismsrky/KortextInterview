import { animate, state, style, transition, trigger } from "@angular/animations";

export const expandCollapse =
    trigger('expandCollapse', [
        state('*', style({
            height: '*',
            width: '*'
        })),
        state('void', style({
            opacity: '0',
            overflow: 'hidden',
            height: '0px',
            width: '0px'
        })),
        transition(':enter', animate('400ms ease-in-out')),
        transition(':leave', animate('400ms ease-in-out'))
    ]);
