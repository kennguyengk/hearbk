import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listenerhome',
  templateUrl: './listenerhome.component.html',
  styleUrls: ['./listenerhome.component.css']
})
export class ListenerhomeComponent implements OnInit {

  constructor() { }


  mListenerList = [
                  {title: 'FANS', icon: '/assets/musicListener/fans.png'},
                  {title: 'SUPERFANS', icon: '/assets/musicListener/Vector.png'},
                  {title: 'BLOGGERS', icon: '/assets/musicListener/blog.png'},
                  {title: 'DJ\'S', icon: '/assets/musicListener/dj.png'},
                  {title: 'RADIO PROS', icon: '/assets/musicListener/microphone.png'},
                  {title: 'ENGINEERS', icon: '/assets/musicListener/artificial-intelligence .png'},
                  {title: 'POBLICISTS', icon: '/assets/musicListener/newspaper.png'},
                  {title: 'PODCASTERS', icon: '/assets/musicListener/podcast.png'},
                  {title: 'JOURNALISTS', icon: '/assets/musicListener/news-microphone.png'},
                  {title: 'VOCAL COACHES', icon: '/assets/musicListener/karaoke.png'},
                  {title: 'INDUSTRY EXECS', icon: '/assets/musicListener/artificial-intelligence.png'},
                  {title: 'SOCIAL INFLUENCERS', icon: '/assets/musicListener/network.png'},
                  {title: 'PRODUCERS', icon: '/assets/musicListener/star.png'}
                ];



workList = [
            {bdgC: '1', desc: 'Search for the perfect listeners', icon: '/assets/musicListener/search.png'},
            {bdgC: '2', desc: 'Listener profiles, photos and previous reviews help you decide the best fit for your track', icon: '/assets/musicListener/Vector2.png'},
            {bdgC: '3', desc: 'Submit 1 track accompanied by 1-2 survey questions', icon: '/assets/musicListener/album.png'},
            {bdgC: '4', desc: 'Listeners are notified when a new track and survey are available. Once the survey is complete, you get the guaranteed exposure, response and feedback you’ve always been looking for. Send your music as much as you want.', icon: '/assets/musicListener/chatting.png'}
          ];

  ngOnInit() {
  }

}
