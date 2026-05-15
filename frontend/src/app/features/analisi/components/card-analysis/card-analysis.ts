import { CommonModule, CurrencyPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

import { AbsPipe } from '../../../../shared/pipes/abs.pipe';

@Component({
  selector: 'app-card-analysis',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    AbsPipe,
  ],
  templateUrl: './card-analysis.html',
  styleUrls: ['./card-analysis.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardAnalysisComponent {
  @Input() label = '';

  @Input() value: number | string = 0;

  @Input() trendPercentage = 0;

  @Input() isPositiveTrend = false;

  @Input() hasTrend = false;
}
