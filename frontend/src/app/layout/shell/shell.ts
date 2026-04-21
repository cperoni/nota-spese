import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, DestroyRef, ElementRef, HostListener, ViewChild, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {  RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

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
  private breakpointObserver = inject(BreakpointObserver);
  private destroyRef = inject(DestroyRef);

  isMobile = false;

  ngOnInit() {
    this.breakpointObserver
      .observe('(max-width: 768px)')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        this.isMobile = result.matches;
      });
  }
}
