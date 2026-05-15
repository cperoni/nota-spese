import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';

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
  imports: [
    CommonModule,
    PieChartComponent,
    AnalysisStatsComponent,
    AnalysisPeriodFilterComponent,
  ],
  templateUrl: './analisi.html',
  styleUrls: ['./analisi.scss'],
})
export class Analisi implements OnInit {
  private speseService = inject(SpeseService);

  items = signal<AnalysisItem[]>([]);

  loading = signal(false);

  selectedPeriod = signal(30);

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
    await this.loadData();
  }

  async onPeriodChange(days: number) {
    this.selectedPeriod.set(days);

    await this.loadData();
  }

  private async loadData() {
    this.loading.set(true);

    const fromDate = new Date();

    fromDate.setDate(
      fromDate.getDate() - this.selectedPeriod()
    );

    const res = await this.speseService.getTotalsByCategory(
      fromDate.toISOString()
    );

    if (!res.error) {
      this.items.set(
        (res.data || []).filter(
          (r: any) => Number(r.total) > 0
        )
      );
    }

    this.loading.set(false);
  }
}