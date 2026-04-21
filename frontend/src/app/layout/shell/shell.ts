import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { NgIf } from '@angular/common';
@Component({
  standalone: true,
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    RouterLink,
    RouterOutlet,
    NgIf
  ],
  templateUrl: './shell.html',
  styleUrls: ['./shell.scss'],
})
export class Shell implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  private destroyRef = inject(DestroyRef);
  private authService = inject(AuthService);
  private router = inject(Router);
  isMobile = false;

  ngOnInit() {
    this.breakpointObserver
      .observe('(max-width: 768px)')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        this.isMobile = result.matches;
      });
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
