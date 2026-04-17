import { Component } from '@angular/core';
import { Spese } from '../spese/spese';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Spese], // Qui potrai aggiungere altri moduli o componenti se ti serviranno in futuro
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
}
