import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { UiTextField } from '../../../../shared/ui/ui-text-field/ui-text-field';
import { UiSelectField, UiSelectOption } from '../../../../shared/ui/ui-select-field/ui-select-field';
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
    UiSelectField,
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

  categoriaOptions: UiSelectOption[] = [];
  periodoOptions: UiSelectOption[] = [
    { value: 'ultimi_7_giorni', label: 'Ultimi 7 giorni' },
    { value: 'mese_corrente', label: 'Mese corrente' },
    { value: 'ultimi_6_mesi', label: 'Ultimi 6 mesi' },
    { value: 'anno_corrente', label: 'Anno corrente' },
  ];

    ngOnChanges(changes: SimpleChanges) {
      if (changes['spese']) {
        console.log('SpeseList - spese changed:', changes['spese'].currentValue); // Debug
      }

      if (changes['categorie']) {
        this.categoriaOptions = [{ value: '', label: 'Tutte le categorie' }, ...(this.categorie || []).map(c => ({ value: c.id, label: c.nome }))];
      }
  }
  
  ngOnInit() {
    this.filters.periodo = this.filtroPeriodo || 'mese_corrente';
    this.categoriaOptions = [{ value: '', label: 'Tutte le categorie' }, ...(this.categorie || []).map(c => ({ value: c.id, label: c.nome }))];
  }

  onSearch(val: string) {
    this.filters.search = val;
    this.applyFilters();
  }

  onCategoriaChange(val: string) {
    this.filters.categoriaId = val || null;
    this.applyFilters();
  }

  onPeriodoChange(val?: string) {
    if (val) this.filters.periodo = val as PeriodoFiltro;
    this.filtroPeriodoChange.emit(this.filters.periodo);
    this.applyFilters();
  }

  applyFilters() {
    this.filterChange.emit(this.filters);
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