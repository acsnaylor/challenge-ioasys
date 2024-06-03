import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IBook, IBookResponse } from '../interfaces/book.interface';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'books';

  constructor(private http: HttpClient) {}

  getBooks(page: number, limit: number): Observable<{ books: IBook[], totalPages: number }> {
    return this.http.get<IBookResponse>(`${this.apiUrl}?_page=${page}&_per_page=${limit}`).pipe(
      map(response => ({
        books: response.data,
        totalPages: response.pages
      })),
      catchError(() => of({ books: [], totalPages: 0 }))
    );
  }
}
