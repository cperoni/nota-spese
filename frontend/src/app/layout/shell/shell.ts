import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, DestroyRef, ElementRef, HostListener, ViewChild, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
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
  sidenavOpened = false;
  sidenavMode: 'side' | 'over' = 'side';

  firstNavigation = true;

  @ViewChild('sidenavEl', { read: ElementRef }) sidenavEl?: ElementRef;
  @ViewChild('sidenav') sidenavComp?: MatSidenav;

  ngOnInit() {
    this.breakpointObserver
      .observe('(max-width: 768px)')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        this.isMobile = result.matches;
        this.sidenavMode = this.isMobile ? 'over' : 'side';
        // keep responsive behavior but do not force-open on app entry
        if (!this.firstNavigation) {
          this.sidenavOpened = !this.isMobile;
        }
      });

    this.router.events
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          if (this.firstNavigation) {
            // ensure menu is closed when entering the app
            this.sidenavOpened = false;
            this.firstNavigation = false;
            return;
          }

          if (this.isMobile || this.sidenavMode === 'over') {
            this.sidenavOpened = false;
          }
        }
      });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.sidenavOpened) return;

    const target = event.target as HTMLElement;

    const clickedInside = this.sidenavEl?.nativeElement.contains(target);
    const clickedToggle = !!target.closest('button[aria-label="Apri menu"]');

    if (!clickedInside && !clickedToggle && this.sidenavMode === 'over') {
      this.sidenavComp?.close();
    }
  }

  onSidenavContentClick(event: MouseEvent) {
    if (!this.sidenavOpened) return;

    const target = event.target as HTMLElement;
    const clickedToggle = !!target.closest('button[aria-label="Apri menu"]');
    const clickedInside = this.sidenavEl?.nativeElement.contains(target);

    if (!clickedInside && !clickedToggle && this.sidenavMode === 'over') {
      this.sidenavComp?.close();
    }
  }

  toggleSidenav() {
    if (this.sidenavComp) {
      this.sidenavComp.toggle();
      return;
    }

    this.sidenavOpened = !this.sidenavOpened;
  }

  onMenuNavigation() {
    if (this.isMobile || this.sidenavMode === 'over') {
      this.sidenavComp?.close();
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
