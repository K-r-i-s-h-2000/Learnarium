import { Component, Input, inject } from '@angular/core';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { YoutubeService } from '../youtube.service';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-youtube',
  standalone: true,
  imports: [YouTubePlayerModule],
  templateUrl: './youtube.component.html',
  styleUrl: './youtube.component.scss',
  template:`
    @if(apiLoaded){
      <youtube-player [playerVars]="{autoplay:1}" [width]="200" [height]="80" [videoId]="id" />
    }
  `
})
export class YoutubeComponent {
  @Input({ required:true})
  id!: string;
  apiLoaded = inject(YoutubeService).apiLoaded;
  constructor(private http:HttpClient,private sanitizer: DomSanitizer,){

  }


}
