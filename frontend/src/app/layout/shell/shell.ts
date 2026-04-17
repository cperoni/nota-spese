import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  standalone: true,
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './shell.html',
  styleUrl: './shell.scss'
})
export class Shell implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private breakpointObserver = inject(BreakpointObserver);
  private destroyRef = inject(DestroyRef);

  isMobile = false;
  sidenavOpened = true;
  sidenavMode: 'side' | 'over' = 'side';

  ngOnInit() {
    this.breakpointObserver
      .observe('(max-width: 768px)')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        this.isMobile = result.matches;
        this.sidenavMode = this.isMobile ? 'over' : 'side';
        this.sidenavOpened = !this.isMobile;
      });
  }

  toggleSidenav() {
    this.sidenavOpened = !this.sidenavOpened;
  }

  onMenuNavigation() {
    if (this.isMobile) {
      this.sidenavOpened = false;
    }
  }

  async eseguiLogout() {
    const { error } = await this.authService.signOut();

    if (error) {
      console.error('Errore durante il logout:', error.message);
      return;
    }

    this.router.navigate(['/login']);
  }
}
