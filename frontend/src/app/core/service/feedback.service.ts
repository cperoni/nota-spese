import { Injectable, signal } from '@angular/core';

export type FeedbackType = 'success' | 'error' | 'info';

export interface FeedbackItem {
  id: number;
  message: string;
  type: FeedbackType;
  actionLabel?: string;
  action?: () => void;
}

@Injectable({ providedIn: 'root' })
export class FeedbackService {
  private _messages = signal<FeedbackItem[]>([]);
  private id = 0;

  messages = this._messages.asReadonly();

  push(item: Omit<FeedbackItem, 'id'>) {
    const newItem = { ...item, id: this.id++ };

    this._messages.update(list => [...list, newItem]);

    setTimeout(() => this.remove(newItem.id), 4000);
  }

  remove(id: number) {
    this._messages.update(list => list.filter(i => i.id !== id));
  }

  success(message: string) {
    this.push({ message, type: 'success' });
  }

  error(message: string) {
    this.push({ message, type: 'error' });
  }
}