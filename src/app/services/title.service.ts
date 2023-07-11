import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TitleService {
    private appTitle: BehaviorSubject<string> = new BehaviorSubject<string>('Bookmonkey-Api')
    appTitle$ = this.appTitle.asObservable();

    setAppTitle(title: string) {
        this.appTitle.next(title);
    }

}
