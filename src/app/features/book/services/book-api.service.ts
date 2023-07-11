import { Injectable, Signal } from '@angular/core';
import { Book } from '../models/book';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { toSignal } from "@angular/core/rxjs-interop";

@Injectable({
    providedIn: 'root',
})
export class BookApiService {
    private readonly API_URL = 'http://localhost:4730'

    constructor(private readonly http: HttpClient) {
    }

    create(book: Partial<Book>): Observable<Book> {
        return this.http.post<Book>(`${this.API_URL}/books/`, book);
    }

    getAll(): Signal<Book[]> {
        const books$ = this.http.get<Book[]>(`${this.API_URL}/books`);

        // automatically subscribes and unsubscribes - modifies the signal when the Observable emits
        return toSignal(books$, { initialValue: [] as Book[] });
    }

    getByIsbn(isbn: string): Signal<Book> {
        const book$ = this.http.get<Book>(`${this.API_URL}/books/${isbn}`);

        return toSignal(book$, { initialValue: {} as Book });
    }
}
