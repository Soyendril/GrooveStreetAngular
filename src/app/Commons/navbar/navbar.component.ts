import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/authentification/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  isOnSwipe: boolean;
  selectedButton: number = 1;

  // variables pour recuperer l'id de la connexion
  musicienId!: string;
  musicienPseudo!: string;

  // id subscription
  private musicienSub!: Subscription;
  isAuthenticated = false;

  constructor(private router: Router,
    private authService: AuthService) {
    this.isOnSwipe = this.router.url === 'Grooves/:id';
    // Vérifier le routerLink actif
    for (const button of this.buttons) {
      if (button.routerLink === this.router.url) {
        this.selectedButton = button.id;
        break;
      }
    }
  }


  ngOnInit() {
    // necessaire pour l'identifiant
    const port = window.location.port;
    const cookieId = `id_${port}`;

    // inscription du musicien
    this.musicienSub = this.authService.musicien.subscribe(musicien =>{
      this.isAuthenticated = !! musicien;

    });

    // met a jour la liste des discussions
    // recupere l'id
    this.musicienId = this.authService.getCookie(cookieId);
    // recupere le pseudo
    this.getpseudo();
  }

  ngOnDestroy(): void {
      this.musicienSub.unsubscribe();
  }
  // Initialiser à 2 pour la page de liste de profils

  buttons = [
    { id: 1, image1: 'assets/img/ppwht.png', image2: 'assets/img/ppgrn.png', routerLink: '/home' },
    { id: 2, image1: 'assets/img/lgwht2.png', image2: 'assets/img/logo_vert.png', routerLink: '/Profile/1' },
    { id: 3, image1: 'assets/img/chatwht.png', image2: 'assets/img/chatgreen.png', routerLink: '/Grooves' }
  ];



  toggleButton(buttonId: number): void {
    this.selectedButton = buttonId;
  }

  private getpseudo(){
    this.authService.getUser(this.musicienId).subscribe((pseudo) => {
      if (pseudo) {
        // Authentification ok
        console.log("recup pseudo")
        this.musicienPseudo = pseudo.pseudo;
        console.log(this.musicienId);
      } else {
        // Authentification false
        // doit afficher un message à l'utilisateur
        console.log("Erreur, vous n'êtes pas connecté");
      }
    });
  }
}
