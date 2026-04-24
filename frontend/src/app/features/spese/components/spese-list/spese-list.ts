import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { UI_ICONS } from '../../../../shared/config/ui-icons';
import { PeriodoFiltro, SpesaItem } from '../../spese.types';

@Component({
  selector: 'app-spese-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, EmptyStateComponent],
  templateUrl: './spese-list.html',
  styleUrls: ['./spese-list.scss'],
})
export class SpeseList {
  @Input({ required: true }) icons!: typeof UI_ICONS;
  @Input() spese: SpesaItem[] = [];
  @Input() filtroPeriodo: PeriodoFiltro = 'ultimi_7_giorni';

  @Output() filtroPeriodoChange = new EventEmitter<PeriodoFiltro>();
  @Output() editClicked = new EventEmitter<SpesaItem>();
  @Output() deleteClicked = new EventEmitter<SpesaItem>();
  @Output() emptyActionClicked = new EventEmitter<void>();
}