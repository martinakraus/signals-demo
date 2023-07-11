import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private _appTitle = signal<string>('Bookmonkey-Api');
  appTitle = this._appTitle.asReadonly();

  setAppTitle(title: string) {
    this._appTitle.set(title);
  }

}
