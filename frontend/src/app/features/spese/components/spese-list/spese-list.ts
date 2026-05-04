import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { UiTextField } from '../../../../shared/ui/ui-text-field/ui-text-field';
import { UI_ICONS } from '../../../../shared/config/ui-icons';
import { CategoriaItem } from '../../../categorie/categorie.types';
import { PeriodoFiltro, SpesaItem } from '../../spese.types';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';

@Component({
  selector: 'app-spese-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    UiTextField,
    EmptyState,
  ],
  templateUrl: './spese-list.html',
  styleUrls: ['./spese-list.scss'],
})
export class SpeseList implements OnInit {
  @Input({ required: true }) icons!: typeof UI_ICONS;
  @Input() spese: SpesaItem[] = [];
  @Input() categorie: CategoriaItem[] = [];
  @Input() filtroPeriodo: PeriodoFiltro = 'mese_corrente' as PeriodoFiltro;

  @Output() editClicked = new EventEmitter<SpesaItem>();
  @Output() deleteClicked = new EventEmitter<SpesaItem>();
  @Output() filtroPeriodoChange = new EventEmitter<PeriodoFiltro>();
  @Output() filterChange = new EventEmitter<any>();
  @Output() emptyActionClicked = new EventEmitter<void>();

  filters = {
    search: '',
    categoriaId: null as string | null,
    periodo: 'mese_corrente' as PeriodoFiltro,
  };

    ngOnChanges(changes: SimpleChanges) {
    if (changes['spese']) {
      console.log('SpeseList - spese changed:', changes['spese'].currentValue);  // Debug
    }
  }
  
  ngOnInit() {
    this.filters.periodo = this.filtroPeriodo || 'mese_corrente';
  }

  onSearch(val: string) {
    this.filters.search = val;
    this.applyFilters();
  }

  applyFilters() {
    this.filterChange.emit(this.filters);
  }

  onPeriodoChange() {
    this.filtroPeriodoChange.emit(this.filters.periodo);
  }

  resetFilters() {
    this.filters = {
      search: '',
      categoriaId: null,
      periodo: 'mese_corrente' as PeriodoFiltro,
    };
    this.applyFilters();
  }
}