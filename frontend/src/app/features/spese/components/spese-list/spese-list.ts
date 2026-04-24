import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-spese-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, EmptyStateComponent],
  templateUrl: './spese-list.html',
})
export class SpeseList {
  @Input() icons!: any;
  @Input() spese: any[] = [];
  @Input() filtroPeriodo = 'ultimi_7_giorni';

  @Output() filtroPeriodoChange = new EventEmitter<string>();
  @Output() editClicked = new EventEmitter<any>();
  @Output() deleteClicked = new EventEmitter<any>();
  @Output() emptyActionClicked = new EventEmitter<void>();
}