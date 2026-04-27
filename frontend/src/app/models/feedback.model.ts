export type FeedbackType = 'success' | 'error' | 'info';

export interface FeedbackItem {
  id: number;
  message: string;
  type: FeedbackType;
  actionLabel?: string;
  action?: () => void;
}