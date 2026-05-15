import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

type PeriodOption = {
  label: string;
  value: number;
};

@Component({
  selector: 'app-analysis-period-filter',
  standalone: true,
  templateUrl: './analysis-period-filter.html',
  styleUrls: ['./analysis-period-filter.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalysisPeriodFilterComponent {
  @Input() selected = 30;

  @Output() selectedChange = new EventEmitter<number>();

  readonly options: PeriodOption[] = [
    {
      label: '7G',
      value: 7,
    },
    {
      label: '30G',
      value: 30,
    },
    {
      label: '3M',
      value: 90,
    },
    {
      label: '1A',
      value: 365,
    },
  ];

  select(value: number) {
    this.selectedChange.emit(value);
  }
}