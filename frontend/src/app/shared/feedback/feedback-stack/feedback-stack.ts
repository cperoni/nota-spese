import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackService } from '../../../core/service/feedback.service';
import { FeedbackItem } from '../feedback-item/feedback-item';

@Component({
  selector: 'app-feedback-stack',
  standalone: true,
  imports: [CommonModule, FeedbackItem],
  templateUrl: './feedback-stack.html',
  styleUrl: './feedback-stack.scss'
})
export class FeedbackStack {
  feedback = inject(FeedbackService);
}