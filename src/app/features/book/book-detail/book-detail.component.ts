import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookApiService } from '../services/book-api.service';
import { switchMap, tap } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { TitleService } from "../../../services/title.service";

@Component({
    selector: 'app-book-detail',
    templateUrl: './book-detail.component.html',
    standalone: true,
    imports: [ TranslateModule, CommonModule, MatButtonModule, RouterLink ],
    styleUrls: [ './book-detail.component.scss' ],
})
export class BookDetailComponent {
    bookApiService = inject(BookApiService);

    book$ = this.route.params.pipe(
        switchMap((params) => this.bookApiService.getByIsbn(params['isbn'])),
        tap((book) => this.titleService.setAppTitle(book.title))
    );

    constructor(private readonly route: ActivatedRoute,
                private readonly titleService: TitleService) {
    }
}
