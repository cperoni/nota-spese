import { Component, inject } from '@angular/core';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  standalone: true,
  imports: [
    MatSidenavModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './shell.html',
  styleUrl: './shell.scss'
})
export class Shell {
  private authService = inject(AuthService);
  private router = inject(Router);

  async eseguiLogout() {
    const { error } = await this.authService.signOut();

    if (error) {
      console.error('Errore durante il logout:', error.message);
      return;
    }

    this.router.navigate(['/login']);
  }
}
