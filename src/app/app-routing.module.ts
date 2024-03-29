import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//composants
import { HomepageComponent } from './Pages/homepage/homepage.component';
import { ChoixPersonnePageComponent } from './Pages/choix-personne-page/choix-personne-page.component';
import { MessagesPageComponent } from './Pages/messages-page/messages-page.component';
import { DiscussionPageComponent } from './Pages/messages-page/discussion-page/discussion-page.component';
import { BioPageComponent } from './Pages/bio-page/bio-page.component';
import { AjoutPhotoPageComponent } from './Pages/ajout-photo-page/ajout-photo-page.component';
import { ProfilPersonnePageComponent } from './Pages/profil-personne-page/profil-personne-page.component';
import { SettingsPageComponent } from './Pages/settings-page/settings-page.component';
import { FormulairePageComponent } from './Pages/formulaire-page/formulaire-page.component';
import { RegisterComponent } from './authentification/register/register.component';
import { LoginComponent } from './authentification/login/login.component';
import { MatchComponent } from "src/app/Pages/match/match.component";


const routes: Routes = [
  //HOMEPAGE
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent },
  //LIKE ou DISLIKE
  { path: 'Grooving', component: ChoixPersonnePageComponent },
  //DISCUSSION
  { path: 'grooves', component: MessagesPageComponent },
  { path: 'grooves/:id', component: DiscussionPageComponent },
  //PROFIL PERSO
  { path: 'Bio', component: BioPageComponent },
  { path: 'Bio/EditPhoto', component: AjoutPhotoPageComponent },
  { path: 'Settings', component: SettingsPageComponent },
  //PROFIL AUTRE
  { path: 'Profile/:id', component: ProfilPersonnePageComponent },
  //FORMULAIRE
  { path: 'Inscription', component:FormulairePageComponent},
  // authentification
  { path: 'login', component:LoginComponent},
  { path: 'register', component:RegisterComponent},
  // detail de la conversation entre musiciens
  { path: 'messages/:musicien2_id', component: DiscussionPageComponent },
  // grooving
  { path: 'itsagroove/:id', component: MatchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
