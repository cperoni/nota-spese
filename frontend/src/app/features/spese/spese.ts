import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { firstValueFrom } from 'rxjs';
import { ConfirmationDialog } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { supabase } from '../../core/supabase.client';
import { LoadingService } from '../../core/service/loading.service';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

import { UI_ICONS } from '../../shared/config/ui-icons';

type PeriodoFiltro =
  | 'ultimi_7_giorni'
  | 'ultima_settimana'
  | 'ultimo_mese'
  | 'ultimi_2_mesi'
  | 'ultimi_6_mesi'
  | 'ultimo_anno'
  | 'tutte';

@Component({
  selector: 'app-spese',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule,EmptyStateComponent],
  templateUrl: './spese.html',
  styleUrls: ['./spese.scss'],
})
export class Spese implements OnInit {
  constructor(
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private loading: LoadingService
  ) {}

  spese: any[] = [];
  categorie: any[] = [];
  filtroPeriodo: PeriodoFiltro = 'ultimi_7_giorni';

  readonly icons = UI_ICONS;

  // Id del record in modifica (null = modalità inserimento)
  editingId: string | null = null;

  importo: number | null = null;
  // Input visuale per l'importo: usa la virgola come separatore decimale (es. 12,50)
  importoStr: string = '';
  // Messaggio di errore per validazione importo (vuoto se valido)
  importoError: string = '';

  descrizione = '';
  categoria_id = '';
  data: string = '';

  async ngOnInit() {

    this.data = new Date().toISOString().substring(0, 10);
    await this.loadCategorie();

    const hasResolved = Object.prototype.hasOwnProperty.call(this.route.snapshot && this.route.snapshot.data ? this.route.snapshot.data : {}, 'spese');
    if (hasResolved) {
      this.spese = this.route.snapshot.data['spese'] || [];
      this.cdr.detectChanges();
    } else {
      // fallback: se il resolver non è stato eseguito, carica comunque le spese
      await this.loadSpese();
    }
  }

  async loadCategorie() {
    const { data } = await supabase
      .from('categorie')
      .select('*')
      .order('nome');

    this.categorie = data ?? [];

    if (this.categorie.length > 0) {
      this.categoria_id = this.categorie[0].id;
    }
    this.cdr.detectChanges();
  }

  async loadSpese() {
    const rangeDate = this.getIntervalloDate(this.filtroPeriodo);
    let query = supabase
      .from('spese')
      .select(`
        id,
        importo,
        descrizione,
        data,
        categoria_id,
        categorie ( nome, colore )
      `)
      .order('data', { ascending: false });

    if (rangeDate?.from) {
      query = query.gte('data', rangeDate.from);
    }

    if (rangeDate?.to) {
      query = query.lte('data', rangeDate.to);
    }

    const { data } = await query;
    this.spese = data ?? [];
    this.cdr.detectChanges();
  }

  // Salva nuova spesa o aggiorna quella in modifica
  async save() {
    if (!this.categoria_id) return;

    if (!this.validateImporto()) return;

    this.importo = parseFloat(this.importoStr.replace(',', '.')) || 0;

    const payload = {
      importo: this.importo,
      descrizione: this.descrizione,
      categoria_id: this.categoria_id,
      data: this.data || new Date().toISOString().split('T')[0],
    };

    this.loading.show();
    try {
      if (this.editingId) {
        await supabase.from('spese').update(payload).eq('id', this.editingId);
      } else {
        await supabase.from('spese').insert([payload]);
      }

      this.resetForm();
      await this.loadSpese();
    } finally {
      this.loading.hide();
    }
  }

  // Chiamata dall'input quando cambia il valore dell'importo
  onImportoChange(value: string) {
    this.importoStr = value;
    // Aggiorna controllo di validità in tempo reale
    this.validateImporto();
  }

  // Seleziona una spesa dalla lista per modificarla
  select(s: any) {
    this.editingId = s.id || null;
    this.importo = s.importo;
    this.importoStr = (s.importo || 0).toFixed(2).replace('.', ',');
    this.descrizione = s.descrizione || '';
    this.categoria_id = s.categoria_id || this.categoria_id;
    this.data = s.data ? s.data.slice(0, 10) : this.formatDate(new Date());
    this.cdr.detectChanges();

    // Porta il form in vista e mette il focus sul campo importo per modificare rapidamente
    setTimeout(() => {
      const el = document.querySelector('form.card.form input[name="importo"]') as HTMLElement | null;
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        try { el.focus(); } catch (e) { /* ignore */ }
      }
    }, 50);
  }

  // Ripristina la form in modalità inserimento
  resetForm() {
    this.editingId = null;
    this.importo = null;
    this.importoStr = '';
    this.importoError = '';
    this.descrizione = '';
    this.categoria_id = this.categorie.length > 0 ? this.categorie[0].id : '';
    this.data = this.formatDate(new Date());
    this.cdr.detectChanges();
  }

  // Restituisce true se `importoStr` rispetta il formato richiesto
  validateImporto(): boolean {
    if (!this.importoStr || this.importoStr.trim() === '') {
      this.importoError = 'L\'importo è obbligatorio.';
      return false;
    }
    // Normalizza il separatore decimale per il parse
    const normalized = this.importoStr.trim().replace(',', '.');
    const num = parseFloat(normalized);
    if (isNaN(num)) {
      this.importoError = 'Inserire un numero valido (es. 12 o 12,50).';
      return false;
    }

    this.importoError = '';
    return true;
  }

  // Formatta l'input al perdere il focus: sempre con 2 decimali e separatore virgola
  onImportoBlur() {
    if (!this.importoStr || this.importoStr.trim() === '') {
      this.importoError = 'L\'importo è obbligatorio.';
      return;
    }

    const normalized = this.importoStr.trim().replace(',', '.');
    const num = parseFloat(normalized);
    if (isNaN(num)) {
      this.importoError = 'Inserire un numero valido (es. 12 o 12,50).';
      return;
    }

    // Format a due decimali e ripristina la virgola come separatore
    this.importoStr = num.toFixed(2).replace('.', ',');
    // Ricalcola validità
    this.validateImporto();
  }

  async delete(id: string) {
    this.loading.show();
    try {
      await supabase.from('spese').delete().eq('id', id);
      await this.loadSpese();
    } finally {
      this.loading.hide();
    }
  }

  async confirmDelete(s: any) {
    const ref = this.dialog.open(ConfirmationDialog, {
      data: {
        title: 'Conferma cancellazione',
        message: `Sei sicuro di cancellare la spesa "${s.categorie?.nome || ''}" di ${s.importo}€?`,
      },
    });
    const result = await firstValueFrom(ref.afterClosed());
    if (!result) return;
    if (!s.id) return;
    await this.delete(s.id);
  }

  async onFiltroPeriodoChange() {
    await this.loadSpese();
  }

  private getIntervalloDate(periodo: PeriodoFiltro): { from?: string; to?: string } | null {
    const oggi = new Date();
    const fine = this.formatDate(oggi);

    switch (periodo) {
      case 'ultimi_7_giorni': {
        const start = new Date(oggi);
        start.setDate(start.getDate() - 6);
        return { from: this.formatDate(start), to: fine };
      }
      case 'ultima_settimana': {
        const day = oggi.getDay(); // 0 domenica
        const diffToMonday = day === 0 ? 6 : day - 1;
        const startCurrentWeek = new Date(oggi);
        startCurrentWeek.setDate(oggi.getDate() - diffToMonday);

        const startPreviousWeek = new Date(startCurrentWeek);
        startPreviousWeek.setDate(startCurrentWeek.getDate() - 7);

        const endPreviousWeek = new Date(startCurrentWeek);
        endPreviousWeek.setDate(startCurrentWeek.getDate() - 1);

        return {
          from: this.formatDate(startPreviousWeek),
          to: this.formatDate(endPreviousWeek),
        };
      }
      case 'ultimo_mese': {
        const start = new Date(oggi);
        start.setMonth(start.getMonth() - 1);
        return { from: this.formatDate(start), to: fine };
      }
      case 'ultimi_2_mesi': {
        const start = new Date(oggi);
        start.setMonth(start.getMonth() - 2);
        return { from: this.formatDate(start), to: fine };
      }
      case 'ultimi_6_mesi': {
        const start = new Date(oggi);
        start.setMonth(start.getMonth() - 6);
        return { from: this.formatDate(start), to: fine };
      }
      case 'ultimo_anno': {
        const start = new Date(oggi);
        start.setFullYear(start.getFullYear() - 1);
        return { from: this.formatDate(start), to: fine };
      }
      case 'tutte':
      default:
        return null;
    }
  }

  private formatDate(date: Date): string {
    return date.toISOString().slice(0, 10);
  }
}
