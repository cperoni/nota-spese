import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { UI_ICONS } from '../../../../shared/config/ui-icons';
import { PeriodoFiltro, SpesaItem } from '../../spese.types';
import {
  UiSelectField,
  UiSelectOption,
} from '../../../../shared/ui/ui-select-field/ui-select-field';

@Component({
  selector: 'app-spese-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, EmptyStateComponent, UiSelectField],
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

  readonly filtroPeriodoOptions: UiSelectOption[] = [
    { value: 'ultimi_7_giorni', label: 'Ultimi 7 giorni' },
    { value: 'ultimo_mese', label: 'Ultimo mese' },
    { value: 'ultimi_2_mesi', label: 'Ultimi 2 mesi' },
    { value: 'ultimi_6_mesi', label: 'Ultimi 6 mesi' },
    { value: 'ultimo_anno', label: 'Ultimo anno' },
    { value: 'tutte', label: 'Tutte le spese' },
  ];

  onFiltroPeriodoChange(value: string): void {
    this.filtroPeriodoChange.emit(value as PeriodoFiltro);
  }
}