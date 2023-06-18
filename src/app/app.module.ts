import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { CookieModule } from 'ngx-cookie';
import { RxStomp } from '@stomp/rx-stomp';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { BoutonsStyleComponent } from './components/boutons-style/boutons-style.component';
import { NavBoutonsBasComponent } from './Commons/nav-boutons-bas/nav-boutons-bas.component';
import { LoginComponent } from './authentification/login/login.component';
import { RegisterComponent } from './authentification/register/register.component';
import { DatePipe } from '@angular/common';

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
    FormulairePageComponent,
    NavBoutonsBasComponent,
    NavBoutonsBasComponent,
    BoutonsStyleComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CookieModule.withOptions(),
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: RxStomp,
      useFactory: () => {
        const rxStomp = new RxStomp();
        rxStomp.configure({
          brokerURL: 'ws://localhost:8080/stomp'
        });
        rxStomp.activate();
        return rxStomp;
      },
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
