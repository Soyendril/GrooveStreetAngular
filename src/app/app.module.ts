import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';


import { AppComponent } from './app.component';
import { SettingsPageComponent } from './Pages/settings-page/settings-page.component';
import { DiscussionPageComponent } from './Pages/messages-page/discussion-page/discussion-page.component';
import { MessagesPageComponent } from './Pages/messages-page/messages-page.component';
import { ChoixPersonnePageComponent } from './Pages/choix-personne-page/choix-personne-page.component';
import { HomepageComponent } from './Pages/homepage/homepage.component';
import { AjoutPhotoPageComponent } from './Pages/ajout-photo-page/ajout-photo-page.component';
import { NavbarComponent } from './Commons/navbar/navbar.component';
import { ProfilPersonnePageComponent } from './Pages/profil-personne-page/profil-personne-page.component';
import { BioPageComponent } from './Pages/bio-page/bio-page.component';
import { FormulairePageComponent } from './Pages/formulaire-page/formulaire-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SettingsPageComponent,
    DiscussionPageComponent,
    MessagesPageComponent,
    ChoixPersonnePageComponent,
    HomepageComponent,
    AjoutPhotoPageComponent,
    NavbarComponent,
    ProfilPersonnePageComponent,
    BioPageComponent,
    FormulairePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
