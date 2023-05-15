import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-boutons-style',
  templateUrl: './boutons-style.component.html',
  styleUrls: ['./boutons-style.component.css']
})
export class BoutonsStyleComponent {
  @Input()
  imageUrl!: string;
}
