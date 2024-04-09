import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { YoutubeComponent } from '../youtube/youtube.component';
import { HeaderComponent } from "../header/header.component";

@Component({
    selector: 'app-aboutus',
    standalone: true,
    animations: [
        trigger('myInsertRemoveTrigger', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('100ms', style({ opacity: 1 })),
            ]),
            transition(':leave', [
                animate('100ms', style({ opacity: 0 }))
            ])
        ]),
    ],
    templateUrl: './aboutus.component.html',
    styleUrl: './aboutus.component.scss',
    imports: [CommonModule, YoutubeComponent, HeaderComponent]
})
export class AboutusComponent {
  isShown = false;

  toggle() {
    this.isShown = !this.isShown;
  }

}
