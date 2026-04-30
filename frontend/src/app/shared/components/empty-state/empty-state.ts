import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './empty-state.html',
  styleUrls: ['./empty-state.scss'],
})
export class EmptyState {
  @Input() icon = 'info';
  @Input() title = 'Nessun elemento';
  @Input() hint = '';
  @Input() actionLabel = 'Aggiungi';
  @Input() showAction = true;

  @Output() action = new EventEmitter<void>();

  onActionClick(): void {
    this.action.emit();
  }
}