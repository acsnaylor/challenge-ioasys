import { Component, OnInit } from '@angular/core';
import { BookService } from '../../shared/services/book.service';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { IUser } from '../../shared/interfaces/user.interface';
import { IBook } from '../../shared/interfaces/book.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  books: IBook[] = [];
  page: number = 1;
  limit: number = 12;
  totalPages: number = 0;
  selectedBook: IBook | null = null;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks(this.page);
  }

  loadBooks(page: number): void {
    this.bookService.getBooks(page, this.limit).subscribe((response) => {
      this.books = response.books;
      this.totalPages = response.totalPages;
    });
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadBooks(this.page);
    }
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadBooks(this.page);
    }
  }

  openModal(book: IBook): void {
    this.selectedBook = book;
  }

  closeModal(): void {
    this.selectedBook = null;
  }
}
