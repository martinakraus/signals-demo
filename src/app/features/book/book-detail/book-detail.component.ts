import { Component, inject, Injector, runInInjectionContext } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookApiService } from '../services/book-api.service';
import { Book } from '../models/book';
import { Observable, switchMap, tap } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { toObservable } from "@angular/core/rxjs-interop";
import { MatButtonModule } from "@angular/material/button";
import { TitleService } from "../../../services/title.service";

@Component({
    selector: 'app-book-detail',
    templateUrl: './book-detail.component.html',
    standalone: true,
    imports: [ TranslateModule, CommonModule, MatButtonModule, RouterLink ],
    styleUrls: [ './book-detail.component.scss' ],
})
export class BookDetailComponent {
    titleService = inject(TitleService);
    injector = inject(Injector);
    bookApiService = inject(BookApiService);

    book$: Observable<Book> = inject(ActivatedRoute).params.pipe(
        switchMap((params) => {
            return runInInjectionContext(this.injector, () => toObservable(this.bookApiService.getByIsbn(params['isbn']))
            )
        }),
        tap((book) => this.titleService.setAppTitle(book.title))
    );
}


