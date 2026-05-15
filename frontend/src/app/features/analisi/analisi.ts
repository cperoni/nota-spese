import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';

import { SpeseService } from '../../core/service/spese.service';

import { AnalysisPeriodFilterComponent } from './components/analysis-period-filter/analysis-period-filter';
import { AnalysisStatsComponent } from './components/analysis-stats/analysis-stats';
import { PieChartComponent } from './components/pie-chart/pie-chart';

type AnalysisItem = {
  id?: string;
  nome: string;
  colore?: string;
  total: number;
};

@Component({
  selector: 'app-analisi',
  standalone: true,
  imports: [CommonModule, PieChartComponent, AnalysisStatsComponent, AnalysisPeriodFilterComponent],
  templateUrl: './analisi.html',
  styleUrls: ['./analisi.scss'],
})
export class Analisi implements OnInit {
  private speseService = inject(SpeseService);

  items = signal<AnalysisItem[]>([]);

  loading = signal(false);

  previousTotal = signal(0);

  selectedPeriod = signal(30);

  totalAmount = computed(() =>
    this.items().reduce((acc, item) => acc + Number(item.total || 0), 0),
  );

  topCategory = computed(() => {
    const sorted = [...this.items()].sort((a, b) => Number(b.total) - Number(a.total));

    return sorted[0]?.nome || '';
  });

  async ngOnInit() {
    await this.loadData();
  }

  async onPeriodChange(days: number) {
    this.selectedPeriod.set(days);

    await this.loadData();
  }

  private async loadData() {
    this.loading.set(true);

    const days = this.selectedPeriod();

    const currentFrom = new Date();

    currentFrom.setDate(currentFrom.getDate() - days);

    const previousFrom = new Date();

    previousFrom.setDate(previousFrom.getDate() - days * 2);

    const previousTo = new Date();

    previousTo.setDate(previousTo.getDate() - days);

    const currentRes = await this.speseService.getTotalsByCategory(currentFrom.toISOString().split('T')[0]);

    const previousRes = await this.speseService.getTotalsByCategoryBetweenDates(
      previousFrom.toISOString().split('T')[0],
      previousTo.toISOString().split('T')[0],
    );

    if (!currentRes.error) {
      this.items.set((currentRes.data || []).filter((r: any) => Number(r.total) > 0));
    }

    if (!previousRes.error) {
      const previousTotal = (previousRes.data || []).reduce(
        (acc: number, item: any) => acc + Number(item.total || 0),
        0,
      );

      this.previousTotal.set(previousTotal);
    }

    this.loading.set(false);
  }
}
