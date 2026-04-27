import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackItem as FeedbackItemType } from '../../../models/feedback.model';
import { FeedbackService } from '../../../core/service/feedback.service';

@Component({
  selector: 'app-feedback-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feedback-item.html',
  styleUrl: './feedback-item.scss',
})
export class FeedbackItem {
  @Input({ required: true }) item!: FeedbackItemType;

  private feedback = inject(FeedbackService);

  onAction() {
    this.item.action?.();
    this.feedback.remove(this.item.id);
  }
}
