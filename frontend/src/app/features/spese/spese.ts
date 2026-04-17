import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { supabase } from '../../core/supabase.client';

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
  imports: [CommonModule, FormsModule],
  templateUrl: './spese.html',
  styleUrl: './spese.css',
})
export class Spese implements OnInit {
  constructor(private cdr: ChangeDetectorRef) {}

  spese: any[] = [];
  categorie: any[] = [];
  filtroPeriodo: PeriodoFiltro = 'ultimi_7_giorni';

  importo: number | null = null;
  descrizione = '';
  categoria_id = '';
  data: string = '';

  async ngOnInit() {

    this.data = new Date().toISOString().substring(0, 10);
    await this.loadCategorie();
    await this.loadSpese();
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

  async add() {
    if (!this.importo || !this.categoria_id) return;

    await supabase.from('spese').insert([
      {
        importo: this.importo,
        descrizione: this.descrizione,
        categoria_id: this.categoria_id,
        data: this.data || new Date().toISOString().split('T')[0], // Usa la data selezionata o quella odierna se non è stata selezionata
      },
    ]);

    this.importo = null;
    this.descrizione = '';
    this.data = '';

    await this.loadSpese();
  }

  async delete(id: string) {
    await supabase.from('spese').delete().eq('id', id);
    await this.loadSpese();
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
