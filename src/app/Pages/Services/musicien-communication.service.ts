import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import Musicien from 'src/app/authentification/model/musicien.model';

@Injectable({
  providedIn: 'root'
})
export class MusicienCommunicationService {

  private getNextMusicienSource = new Subject<Musicien>();
  getNextMusicien$ = this.getNextMusicienSource.asObservable();

  getNextMusicien(musicien: Musicien) {
    this.getNextMusicienSource.next(musicien);
  }
}
