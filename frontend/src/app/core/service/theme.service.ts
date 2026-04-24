import { Injectable, signal } from '@angular/core';

export type AppTheme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
    
  private readonly storageKey = 'app-theme';
  readonly theme = signal<AppTheme>('light');

  initTheme(): void {
    const saved = this.getSavedTheme();
    const preferred = this.getSystemPreferredTheme();
    const initialTheme = saved ?? preferred;

    this.applyTheme(initialTheme);
  }

  toggleTheme(): void {
    const nextTheme: AppTheme = this.theme() === 'light' ? 'dark' : 'light';
    this.applyTheme(nextTheme);
  }

  setTheme(theme: AppTheme): void {
    this.applyTheme(theme);
  }

  private applyTheme(theme: AppTheme): void {
    this.theme.set(theme);

    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.classList.remove('light-theme', 'dark-theme');
      root.classList.add(theme === 'dark' ? 'dark-theme' : 'light-theme');
    }

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.storageKey, theme);
    }
  }

  private getSavedTheme(): AppTheme | null {
    if (typeof localStorage === 'undefined') return null;
    const value = localStorage.getItem(this.storageKey);
    return value === 'light' || value === 'dark' ? value : null;
  }

  private getSystemPreferredTheme(): AppTheme {
    if (typeof window === 'undefined' || !window.matchMedia) return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}