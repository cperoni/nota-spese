import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FeedbackStack } from './shared/feedback/feedback-stack/feedback-stack';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FeedbackStack],
  templateUrl: './app.html',
})
export class App {}