import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { BookService } from '../../shared/services/book.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { IBook } from '../../shared/interfaces/book.interface';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let bookServiceMock: any;

  const mockBooks: IBook[] = [
    { id: 1, title: 'Test Book', author: 'Test Author', pages: 100, publisher: 'Test Publisher', year: 2020, cover: 'test-cover.png' }
  ];

  beforeEach(async () => {
    bookServiceMock = {
      getBooks: jasmine.createSpy('getBooks').and.returnValue(of({ books: mockBooks, totalPages: 1 }))
    };

    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: BookService, useValue: bookServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load books on init', () => {
    expect(bookServiceMock.getBooks).toHaveBeenCalledWith(1, 12);
    expect(component.books.length).toBe(1);
    expect(component.totalPages).toBe(1);
  });

  it('should navigate to next page', () => {
    component.totalPages = 2;
    component.nextPage();
    expect(component.page).toBe(2);
    expect(bookServiceMock.getBooks).toHaveBeenCalledWith(2, 12);
  });

  it('should navigate to previous page', () => {
    component.page = 2;
    component.previousPage();
    expect(component.page).toBe(1);
    expect(bookServiceMock.getBooks).toHaveBeenCalledWith(1, 12);
  });

  it('should open and close modal', () => {
    const book: IBook = { id: 1, title: 'Test Book', author: 'Test Author', pages: 100, publisher: 'Test Publisher', year: 2020, cover: 'test-cover.png' };
    component.openModal(book);
    expect(component.selectedBook).toBe(book);

    component.closeModal();
    expect(component.selectedBook).toBeNull();
  });
});
