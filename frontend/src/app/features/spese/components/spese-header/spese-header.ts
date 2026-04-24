import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-spese-header',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './spese-header.html',
})
export class SpeseHeader {
  @Input() icons!: any;
  @Output() addClicked = new EventEmitter<void>();
}