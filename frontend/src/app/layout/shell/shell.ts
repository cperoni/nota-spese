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
import { Breakpoints } from '@angular/cdk/layout';
import { MatDrawerMode } from '@angular/material/sidenav';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  standalone: true,
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    RouterLink,
    RouterOutlet,
    NgIf,
    LoadingSpinnerComponent,
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

  sidenavMode: MatDrawerMode = this.isMobile ? 'over' : 'side';
  sidenavOpened = !this.isMobile;

  ngOnInit() {
    this.breakpointObserver
    .observe([Breakpoints.Handset])
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(result => {
      this.isMobile = result.matches;
      this.sidenavMode = this.isMobile ? 'over' : 'side';
      this.sidenavOpened = !this.isMobile;
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
