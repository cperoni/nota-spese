import { CommonModule, CurrencyPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

import { AbsPipe } from '../../../../shared/pipes/abs.pipe';

@Component({
  selector: 'app-analysis-stats',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    AbsPipe,
  ],
  templateUrl: './analysis-stats.html',
  styleUrls: ['./analysis-stats.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalysisStatsComponent {
  @Input() total = 0;

  @Input() previousTotal = 0;

  @Input() categoriesCount = 0;

  @Input() topCategory = '';

  get trendPercentage(): number {
    if (!this.previousTotal) {
      return 0;
    }

    return Math.round(
      ((this.total - this.previousTotal) /
        this.previousTotal) *
        100
    );
  }

  get isPositiveTrend(): boolean {
    return this.trendPercentage > 0;
  }

  get hasTrend(): boolean {
    return this.previousTotal > 0;
  }
}