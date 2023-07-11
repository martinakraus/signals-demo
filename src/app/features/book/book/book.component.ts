import { Component, inject } from '@angular/core';
import { Book } from '../models/book';
import { BookApiService } from '../services/book-api.service';
import { Router } from '@angular/router';
import { BookCardComponent } from '../book-card/book-card.component';
import { CommonModule } from '@angular/common';
import { TitleService } from "../../../services/title.service";

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    standalone: true,
    imports: [ BookCardComponent, CommonModule ],
    styleUrls: [ './book.component.scss' ],
})
export class BookComponent {
    books$ = inject(BookApiService).getAll();

    constructor(private readonly router: Router,
                private readonly titleService: TitleService) {
        this.titleService.setAppTitle('Bookmonkey-App')
    }

    navigateToDetail(book: Book) {
        this.router.navigate([ '/books', book.isbn ]);
    }
}
