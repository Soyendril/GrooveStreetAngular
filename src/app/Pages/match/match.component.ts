import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent {

  constructor(private router : Router) {   }

  keepScroll(){
    this.router.navigate(['/Profile/:id'])
  }

  goChat(){
    this.router.navigate(['/grooves/:id'])
  }
}
