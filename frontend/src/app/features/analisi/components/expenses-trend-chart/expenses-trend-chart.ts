import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  computed,
  inject,
  effect,
} from '@angular/core';
import { ThemeService } from '../../../../core/service/theme.service';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexStroke,
  ApexTooltip,
  ApexTheme,
  NgApexchartsModule,
  ApexNonAxisChartSeries,
  ApexXAxis,
} from 'ng-apexcharts';

export type TrendChartItem = {
  date: string;
  total: number;
};

@Component({
  selector: 'app-expenses-trend-chart',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './expenses-trend-chart.html',
  styleUrls: ['./expenses-trend-chart.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpensesTrendChartComponent implements OnChanges {
  @Input({ required: true })
  items: TrendChartItem[] = [];
  readonly chartKey = computed(() => this.themeService.theme());

  private readonly themeService = inject(ThemeService);

  readonly isDarkMode = computed(() => this.themeService.theme() === 'dark');

  private readonly themeEffect = effect(() => {
    this.isDarkMode();

    this.updateChart();
  });

  chartOptions = this.buildChartOptions();

  ngOnChanges() {
    this.updateChart();
  }

  private updateChart() {
    this.chartOptions = this.buildChartOptions();
  }

  private applyTheme() {
    const isDark = this.isDarkMode();

    const secondaryTextColor = isDark ? '#9ca3af' : '#6b7280';

    const borderColor = isDark ? '#374151' : '#e5e7eb';
  }

  private formatDate(date: string) {
    return new Date(date).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
    });
  }

  private buildChartOptions() {
    const isDark = this.isDarkMode();

    const textColor = isDark ? '#e5e7eb' : '#475569';

    const borderColor = isDark ? '#374151' : '#e2e8f0';

    const lineColor = isDark ? '#60a5fa' : '#2563eb';

    return {
      series: [
        {
          name: 'Spese',
          data: this.items.map((item) => Number(item.total)),
        },
      ] as ApexAxisChartSeries,

      chart: {
        type: 'area',
        height: 320,
        background: isDark ? '#1f2937' : '#ffffff',
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
        foreColor: textColor,
      } as ApexChart,

      colors: [lineColor],

      stroke: {
        curve: 'smooth',
        width: 3,
      } as ApexStroke,

      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: isDark ? 0.35 : 0.2,
          opacityTo: 0.03,
          stops: [0, 100],
        },
      } as ApexFill,

      dataLabels: {
        enabled: false,
      } as ApexDataLabels,

      grid: {
        borderColor,
        strokeDashArray: 4,
      } as ApexGrid,

      xaxis: {
        categories: this.items.map((item) => this.formatDate(item.date)),

        axisBorder: {
          show: false,
        },

        axisTicks: {
          show: false,
        },

        labels: {
          style: {
            colors: textColor,
          },
        },
      } as ApexXAxis,

      tooltip: {
        theme: isDark ? 'dark' : 'light',
        shared: true,
        intersect: false,
        y: {
          formatter: (value: number) => `€ ${value}`,
        },
      } as ApexTooltip,

      theme: {
        mode: isDark ? 'dark' : 'light',
      } as ApexTheme,
    };
  }
}
