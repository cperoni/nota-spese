import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

// Import componenti condivisi - VERIFICA I PERCORSI
import { UiTextField } from '../../../../shared/ui/ui-text-field/ui-text-field';
import { UI_ICONS } from '../../../../shared/config/ui-icons';
import { CategoriaItem } from '../../../categorie/categorie.types';
import { PeriodoFiltro, SpesaItem } from '../../spese.types';

// Se il file si chiama empty-state.ts e non empty-state.component.ts, usa questo:
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';

// Definiamo il tipo localmente per evitare errori di assegnazione se non è importato correttamente

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
    EmptyState
  ],
  templateUrl: './spese-list.html',
  styleUrls: ['./spese-list.scss']
})
export class SpeseList implements OnInit {
  @Input({ required: true }) icons!: typeof UI_ICONS; 
  @Input() spese: SpesaItem[] = [];
  @Input() categorie: CategoriaItem[] = [];
  
  // Inizializziamo con un casting per evitare TS2322
  @Input() filtroPeriodo: PeriodoFiltro = 'month' as PeriodoFiltro;

  @Output() editClicked = new EventEmitter<SpesaItem>();
  @Output() deleteClicked = new EventEmitter<SpesaItem>();
  @Output() filtroPeriodoChange = new EventEmitter<PeriodoFiltro>();
  @Output() filterChange = new EventEmitter<any>();
  @Output() emptyActionClicked = new EventEmitter<void>();

  filters = {
    search: '',
    categoriaId: null as string | null,
    periodo: 'month' as PeriodoFiltro
  };

  ngOnInit() {
    this.filters.periodo = this.filtroPeriodo;
  }

  onSearch(val: string) {
    this.filters.search = val;
    this.applyFilters();
  }

  applyFilters() {
    this.filterChange.emit(this.filters);
  }

  loadSpese() {
    this.applyFilters();
  }

  resetFilters() {
    this.filters = {
      search: '',
      categoriaId: null,
      periodo: 'month' as PeriodoFiltro
    };
    this.applyFilters();
  }
}