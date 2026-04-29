import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CategorieService } from './../../core/service/categorie.service';
import { CategoriaItem, CategoriaFormModel } from './categorie.types';
import { LoadingService } from '../../core/service/loading.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { ConfirmationDialog } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';

import { CategorieHeader } from './components/categorie-header/categorie-header';
import { CategorieForm } from './components/categorie-form/categorie-form';
import { CategorieList } from './components/categorie-list/categorie-list';

import { UI_ICONS } from '../../shared/config/ui-icons';

@Component({
  selector: 'app-categorie',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    CategorieHeader,
    CategorieForm,
    CategorieList,
  ],
  templateUrl: './categorie.html',
  styleUrls: ['./categorie.scss'],
})
export class Categorie implements OnInit, OnDestroy {
  categorie: CategoriaItem[] = [];
  model: CategoriaFormModel = { nome: '', colore: '#000000' } as CategoriaFormModel;
  editingId: string | null = null;
  private sub: Subscription | null = null;

  readonly icons = UI_ICONS;

  constructor(private cs: CategorieService, private route: ActivatedRoute, private dialog: MatDialog, private loading: LoadingService) {
  }

  ngOnInit(): void {
    const resolved = this.route.snapshot.data?.['categorie'] as unknown[] | undefined;
if (resolved?.length) {
  this.categorie = resolved.map((row) => this.normalizeCategoria(row));
} else {
  this.load();
}
    this.sub = this.cs.refresh.subscribe(() => {
      this.load();
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  async load() {
    const { data, error } = await this.cs.getCategorie();
    if (error) {
      console.error('Errore caricamento categorie', error);
      return;
    }
  
    this.categorie = (data ?? []).map((row) => this.normalizeCategoria(row));
  }

  select(cat: CategoriaItem) {
    this.editingId = cat.id || null;
    this.model = { ...cat };
  }

  resetForm() {
    this.editingId = null;
    this.model = { nome: '', colore: '#000000' };
  }

  async save() {
    if (!this.model.nome || !this.model.colore) return;
    this.loading.show();
    try {
      if (this.editingId) {
        const { error } = await this.cs.updateCategoria(this.editingId, {
          nome: this.model.nome,
          colore: this.model.colore,
        });
        if (error) return console.error('update error', error);
      } else {
        const { error } = await this.cs.addCategoria(this.model);
        if (error) return console.error('insert error', error);
      }
      await this.load();
      this.resetForm();
    } finally {
      this.loading.hide();
    }
  }

  async confirmDelete(cat: CategoriaItem) {
    const ref = this.dialog.open(ConfirmationDialog, {
      data: {
        title: 'Conferma cancellazione',
        message: `Sei sicuro di cancellare la categoria "${cat.nome}"?`,
      },
    });
    const result = await firstValueFrom(ref.afterClosed());
    if (!result) return;
    if (!cat.id) return;
    this.loading.show();
    try {
      const { error } = await this.cs.deleteCategoria(cat.id);
      if (error) return console.error('delete error', error);
      await this.load();
    } finally {
      this.loading.hide();
    }
  }

  private normalizeCategoria(row: any): CategoriaItem {
    return {
      id: String(row?.id ?? ''),
      nome: String(row?.nome ?? ''),
      colore: String(row?.colore ?? '#000000'),
      created_at: row?.created_at ? String(row.created_at) : undefined,
      // Supabase restituisce il conteggio come un array nell'oggetto 'spese'
      numeroSpese: row?.spese?.[0]?.count ?? 0,
    };
  }
}
