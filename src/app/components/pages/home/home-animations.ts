import { trigger, state, style, transition, animate } from '@angular/animations';

export const Animations = {
    enterStateLeftRight:
        trigger('enterStateLeftRight', [
            state('void', style({
                opacity: 0,
                marginLeft: '-300px'
            })),
            transition(':enter', [
                animate(700, style({
                    opacity: 1,
                    marginLeft: '0'
                }))
            ])
        ]),
    enterState:
        trigger('enterState', [
            state('void', style({
                opacity: 0
            })),
            transition(':enter', [
                animate(700, style({
                    opacity: 1
                }))
            ])
        ]),
    zoomImage:
        trigger('zoomImage', [
            state('start', style({
                backgroundSize: '120%'
            })),
            state('end', style({
                backgroundSize: '160%'
            })),
            transition('start => end', [
                animate('0.8s')
            ])
        ])
    

}