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
  ApexXAxis,
  NgApexchartsModule,
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

  private readonly themeService = inject(ThemeService);

  readonly isDarkMode = computed(() => this.themeService.theme() === 'dark');

  private readonly themeEffect = effect(() => {
    this.isDarkMode();

    this.applyTheme();
  });

  chartSeries: ApexAxisChartSeries = [];

  chart: ApexChart = {
    type: 'area',
    height: 320,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  };

  stroke: ApexStroke = {
    curve: 'smooth',
    width: 3,
  };

  fill: ApexFill = {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.3,
      opacityTo: 0.05,
      stops: [0, 100],
    },
  };

  dataLabels: ApexDataLabels = {
    enabled: false,
  };

  grid: ApexGrid = {
    borderColor: '#e5e7eb',
    strokeDashArray: 4,
  };

  xaxis: ApexXAxis = {
    categories: [],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      style: {
        colors: '#6b7280',
      },
    },
  };

  tooltip: ApexTooltip = {
    theme: 'dark',
    y: {
      formatter: (value) => `€ ${value}`,
    },
  };

  theme: ApexTheme = {
    mode: 'light',
  };

  colors: string[] = ['#2563eb'];

  ngOnChanges() {
    this.updateChart();
  }

  private updateChart() {
    this.applyTheme();
    this.chartSeries = [
      {
        name: 'Spese',
        data: this.items.map((item) => Number(item.total)),
      },
    ];

    this.xaxis = {
      ...this.xaxis,
      categories: this.items.map((item) => this.formatDate(item.date)),
    };
  }

  private applyTheme() {
    const isDark = this.isDarkMode();

    const secondaryTextColor = isDark ? '#9ca3af' : '#6b7280';

    const borderColor = isDark ? '#374151' : '#e5e7eb';

    this.theme = {
      mode: isDark ? 'dark' : 'light',
    };

    this.colors = [isDark ? '#60a5fa' : '#2563eb'];

    this.grid = {
      ...this.grid,
      borderColor,
    };

    this.xaxis = {
      ...this.xaxis,
      labels: {
        style: {
          colors: secondaryTextColor,
        },
      },
    };

    this.tooltip = {
      ...this.tooltip,
      theme: isDark ? 'dark' : 'light',
    };

    this.chart = {
      ...this.chart,
      foreColor: secondaryTextColor,
      background: 'transparent',
    };
  }

  private formatDate(date: string) {
    return new Date(date).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
    });
  }
}
