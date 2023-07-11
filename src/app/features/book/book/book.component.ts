import { Component, inject, OnInit, Signal, WritableSignal } from '@angular/core';
import { Book } from '../models/book';
import { BookApiService } from '../services/book-api.service';
import { Observable, Subscription } from 'rxjs';
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
    books: Signal<Book[]> = inject(BookApiService).getAll();
    private router = inject(Router);

    constructor() {
       inject(TitleService).setAppTitle('Bookmonkey-Api')
    }


    navigateToDetail(book: Book) {
        this.router.navigate([ '/books', book.isbn ]);
    }
}
