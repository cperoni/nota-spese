import { Injectable, signal, Signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private counter = 0;
  private _loading = signal(false);

  readonly loading: Signal<boolean> = this._loading;

  show() {
    this.counter++;
    if (this.counter > 0) this._loading.set(true);
  }

  hide() {
    this.counter = Math.max(0, this.counter - 1);
    if (this.counter === 0) this._loading.set(false);
  }

  reset() {
    this.counter = 0;
    this._loading.set(false);
  }
}
