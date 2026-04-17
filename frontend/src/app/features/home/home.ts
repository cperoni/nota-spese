import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
// NOTA: Assicurati che il percorso di importazione sia corretto per la tua struttura delle cartelle
import { AuthService } from '../../service/auth.service';
import { Spese } from '../spese/spese';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Spese], // Qui potrai aggiungere altri moduli o componenti se ti serviranno in futuro
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  // Iniettiamo i servizi
  private authService = inject(AuthService);
  private router = inject(Router);

  /**
   * Esegue la disconnessione dell'utente e lo riporta al login
   */
  async eseguiLogout() {
    const { error } = await this.authService.signOut();

    if (error) {
      // Se c'è un errore, lo mostriamo nella console
      console.error('Errore durante il logout:', error.message);
    } else {
      // Se va tutto bene, navighiamo alla pagina di login
      this.router.navigate(['/login']);
    }
  }
}