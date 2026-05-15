import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

import { CardAnalysisComponent } from '../card-analysis/card-analysis';

@Component({
  selector: 'app-analysis-stats',
  standalone: true,
  imports: [
    CommonModule,
    CardAnalysisComponent,
  ],
  templateUrl: './analysis-stats.html',
  styleUrls: ['./analysis-stats.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalysisStatsComponent {
  @Input() totalSpese = 0;

  @Input() previousTotalSpese = 0;

  @Input() totalEntrate = 0;

  @Input() previousTotalEntrate = 0;

  @Input() categoriesCount = 0;

  @Input() topCategory = '';

  get speseTrendPercentage(): number {
    if (!this.previousTotalSpese) {
      return 0;
    }

    return Math.round(
      ((this.totalSpese - this.previousTotalSpese) /
        this.previousTotalSpese) *
        100
    );
  }

  get entrateTrendPercentage(): number {
    if (!this.previousTotalEntrate) {
      return 0;
    }

    return Math.round(
      ((this.totalEntrate - this.previousTotalEntrate) /
        this.previousTotalEntrate) *
        100
    );
  }

  get isPositiveSpeseTrend(): boolean {
    return this.speseTrendPercentage < 0;
  }

  get isPositiveEntrateTrend(): boolean {
    return this.entrateTrendPercentage > 0;
  }

  get hasSpeseTrend(): boolean {
    return this.previousTotalSpese > 0;
  }

  get hasEntrateTrend(): boolean {
    return this.previousTotalEntrate > 0;
  }
}