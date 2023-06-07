import { Component, OnInit } from '@angular/core';
import { AuthService } from './authentification/services/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Groove-street-Angular';

  // id subscription
  private musicienSub!: Subscription;
  isAuthenticated = false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    // fonctionne mais avec actualisation
    // this.isAuthenticated = this.authService.isLoggedIn();
    // inscription du musicien
    
    // recupere le subject musicien
    this.authService.autoLogin();
    
    this.isAuthenticated = this.authService.isLoggedIn();

    this.musicienSub = this.authService.musicien.subscribe(musicien => {
      this.isAuthenticated = musicien !== null;
    });

  }

  ngOnDestroy() {
    this.musicienSub.unsubscribe();
    this.authService.logout();
    this.isAuthenticated = false;
  }
}
