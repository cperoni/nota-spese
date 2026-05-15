import { CommonModule, CurrencyPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-analysis-stats',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './analysis-stats.html',
  styleUrls: ['./analysis-stats.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalysisStatsComponent {
  @Input() total = 0;
  @Input() categoriesCount = 0;
  @Input() topCategory = '';
}