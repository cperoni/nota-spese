import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexStroke,
  ApexTooltip,
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
  imports: [
    CommonModule,
    NgApexchartsModule,
  ],
  templateUrl: './expenses-trend-chart.html',
  styleUrls: ['./expenses-trend-chart.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpensesTrendChartComponent
  implements OnChanges
{
  @Input({ required: true })
  items: TrendChartItem[] = [];

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

  ngOnChanges() {
    this.updateChart();
  }

  private updateChart() {
    this.chartSeries = [
      {
        name: 'Spese',
        data: this.items.map((item) =>
          Number(item.total)
        ),
      },
    ];

    this.xaxis = {
      ...this.xaxis,
      categories: this.items.map((item) =>
        this.formatDate(item.date)
      ),
    };
  }

  private formatDate(date: string) {
    return new Date(date).toLocaleDateString(
      'it-IT',
      {
        day: '2-digit',
        month: '2-digit',
      }
    );
  }
}