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
  isLoggedIn: boolean = false;
  private loggedInSubscription!: Subscription;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    // fonctionne mais avec actualisation
    // this.isAuthenticated = this.authService.isLoggedIn();
    // inscription du musicien
    
    // recupere le subject musicien
    // this.authService.autoLogin();
    this.isLoggedIn = this.authService.isLoggedIn();

    this.loggedInSubscription = this.authService.getLoggedInSubject().subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  ngOnDestroy() {
    this.loggedInSubscription.unsubscribe();
    // this.isAuthenticated = false;
  }
}
