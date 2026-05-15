import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';

import { SpeseService } from '../../core/service/spese.service';

import { AnalysisStatsComponent } from './components/analysis-stats/analysis-stats';
import { PieChartComponent } from './components/pie-chart/pie-chart';

@Component({
  selector: 'app-analisi',
  standalone: true,
  imports: [
    CommonModule,
    PieChartComponent,
    AnalysisStatsComponent,
  ],
  templateUrl: './analisi.html',
  styleUrls: ['./analisi.scss'],
})
export class Analisi implements OnInit {
  private speseService = inject(SpeseService);

  items = signal<
    { id?: string; nome: string; colore?: string; total: number }[]
  >([]);

  loading = signal(false);

  totalAmount = computed(() =>
    this.items().reduce((acc, item) => acc + Number(item.total || 0), 0)
  );

  topCategory = computed(() => {
    const sorted = [...this.items()].sort(
      (a, b) => Number(b.total) - Number(a.total)
    );

    return sorted[0]?.nome || '';
  });

  async ngOnInit() {
    this.loading.set(true);

    const res = await this.speseService.getTotalsByCategory();

    if (!res.error) {
      this.items.set(
        (res.data || []).filter((r: any) => Number(r.total) > 0)
      );
    }

    this.loading.set(false);
  }
}