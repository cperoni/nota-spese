import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import type { ApexOptions } from 'apexcharts';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [CommonModule, ChartComponent],
  templateUrl: './pie-chart.html',
  styleUrls: ['./pie-chart.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PieChartComponent {
  @Input() items: { id?: string; nome: string; colore?: string; total: number }[] = [];

  get series(): number[] {
    return (this.items || []).map((i) => Number(i.total) || 0);
  }

  get labels(): string[] {
    return (this.items || []).map((i) => i.nome || '');
  }

  chart = { type: 'pie' as const };

  options: ApexOptions = {
    legend: { position: 'bottom' },
    chart: { toolbar: { show: false } },
    responsive: [
      {
        breakpoint: 768,
        options: {
          legend: { position: 'bottom' },
        },
      },
    ],
  };
}
