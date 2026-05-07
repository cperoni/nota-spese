import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { PieChartComponent } from './components/pie-chart/pie-chart';
import { SpeseService } from '../../core/service/spese.service';

@Component({
  selector: 'app-analisi',
  standalone: true,
  imports: [CommonModule, PieChartComponent],
  templateUrl: './analisi.html',
  styleUrls: ['./analisi.scss'],
})
export class Analisi implements OnInit {
  private speseService = inject(SpeseService);
  items = signal<{ id?: string; nome: string; colore?: string; total: number }[]>([]);
  loading = signal(false);
  async ngOnInit() {
    this.loading.set(true);
    // usare il servizio per ottenere i totali per categoria
    const res = await this.speseService.getTotalsByCategory();
    if (!res.error) {
      // mostrare solo categorie con valore > 0
      this.items.set((res.data || []).filter((r: any) => Number(r.total) > 0));
    }
    this.loading.set(false);
  }
}
