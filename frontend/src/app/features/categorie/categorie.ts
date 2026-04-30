import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { UI_ICONS } from '../../shared/config/ui-icons';
import { CategoriaItem, CategoriaFormModel } from './categorie.types';
import { CategorieService } from '../../core/service/categorie.service';
import { LoadingService } from '../../core/service/loading.service';
import { ConfirmationDialog } from '../../shared/components/confirmation-dialog/confirmation-dialog';
import { CategorieHeader } from './components/categorie-header/categorie-header';
import { CategorieForm } from './components/categorie-form/categorie-form';
import { CategorieList } from './components/categorie-list/categorie-list';

@Component({
  selector: 'app-categorie',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    CategorieHeader,
    CategorieForm,
    CategorieList
  ],
  templateUrl: './categorie.html',
  styleUrls: ['./categorie.scss']
})
export class Categorie implements OnInit {
  readonly icons = UI_ICONS;

  categorie: CategoriaItem[] = [];
  editingId: string | null = null;
  
  // Modello inizializzato a vuoto per forzare la validazione al primo invio
  model: CategoriaFormModel = {
    nome: '',
    colore: ''
  };

  // Variabile per gestire lo stato di errore del selettore colore
  errorColore = '';

  constructor(
    private categorieService: CategorieService,
    private loading: LoadingService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadCategorie();
  }

  async loadCategorie() {
    this.loading.show();
    try {
      const { data, error } = await this.categorieService.getCategorie();
      if (error) throw error;
      this.categorie = (data || []).map(row => this.normalizeCategoria(row));
    } catch (err: any) {
      this.snackBar.open('Errore nel caricamento categorie', 'Chiudi', { duration: 3000 });
    } finally {
      this.loading.hide();
    }
  }

  async save() {
    // 1. Reset stati di errore
    this.errorColore = '';

    // 2. Validazione Manuale
    let isValid = true;

    if (!this.model.nome.trim()) {
      isValid = false; 
      // Nota: il campo testo Material si colora già col [required]
    }

    if (!this.model.colore) {
      this.errorColore = 'Seleziona un colore per la categoria';
      isValid = false;
    }

    if (!isValid) return;

    // 3. Salvataggio
    this.loading.show();
    try {
      if (this.editingId) {
        const { error } = await this.categorieService.updateCategoria(this.editingId, this.model);
        if (error) throw error;
        this.snackBar.open('Categoria aggiornata', 'OK', { duration: 2000 });
      } else {
        const { error } = await this.categorieService.addCategoria(this.model);
        if (error) throw error;
        this.snackBar.open('Categoria aggiunta', 'OK', { duration: 2000 });
      }
      this.resetForm();
      this.loadCategorie();
    } catch (err: any) {
      this.snackBar.open('Errore durante il salvataggio', 'Chiudi', { duration: 3000 });
    } finally {
      this.loading.hide();
    }
  }

  select(c: CategoriaItem) {
    this.editingId = c.id;
    this.model = {
      nome: c.nome,
      colore: c.colore
    };
    this.errorColore = '';
    // Scroll opzionale verso il form quando si modifica
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  confirmDelete(c: CategoriaItem) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        title: 'Elimina Categoria',
        message: `Sei sicuro di voler eliminare "${c.nome}"? ${c.numeroSpese && c.numeroSpese > 0 ? 'Ci sono spese associate.' : ''}`,
        confirmText: 'Elimina',
        cancelText: 'Annulla'
      }
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        this.loading.show();
        try {
          const { error } = await this.categorieService.deleteCategoria(c.id);
          if (error) throw error;
          this.snackBar.open('Categoria eliminata', 'OK', { duration: 2000 });
          this.loadCategorie();
        } catch (err: any) {
          this.snackBar.open('Impossibile eliminare: verifica se ci sono spese collegate', 'Chiudi', { duration: 4000 });
        } finally {
          this.loading.hide();
        }
      }
    });
  }

  resetForm() {
    this.editingId = null;
    this.model = { nome: '', colore: '' };
    this.errorColore = '';
  }

  private normalizeCategoria(row: any): CategoriaItem {
    return {
      id: String(row?.id ?? ''),
      nome: String(row?.nome ?? ''),
      colore: String(row?.colore ?? '#000000'),
      created_at: row?.created_at ? String(row.created_at) : undefined,
      // Estrae il conteggio dal join di Supabase
      numeroSpese: row?.spese?.[0]?.count ?? 0
    };
  }
}