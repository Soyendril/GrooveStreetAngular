import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicienCommunicationService {
  private getNextMusicienSource = new BehaviorSubject<boolean>(false);
  getNextMusicien$ = this.getNextMusicienSource.asObservable();

  emitGetNextMusicien() {
    this.getNextMusicienSource.next(true);
  }
}
