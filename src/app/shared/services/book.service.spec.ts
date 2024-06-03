import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BookService } from './book.service';
import { IBook, IBookResponse } from '../interfaces/book.interface';

describe('BookService', () => {
  let service: BookService;
  let httpMock: HttpTestingController;

  const mockBookResponse: IBookResponse = {
    first: 1,
    prev: null,
    next: 2,
    last: 3,
    pages: 3,
    items: 30,
    data: [
      { id: 1, title: 'Test Book', author: 'Test Author', pages: 100, publisher: 'Test Publisher', year: 2020, cover: 'test-cover.png' }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService]
    });
    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch books correctly', () => {
    const page = 1;
    const limit = 12;

    service.getBooks(page, limit).subscribe(response => {
      expect(response.books.length).toBe(1);
      expect(response.books).toEqual(mockBookResponse.data);
      expect(response.totalPages).toBe(mockBookResponse.pages);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}?_page=${page}&_per_page=${limit}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBookResponse);
  });

  it('should handle errors gracefully', () => {
    const page = 1;
    const limit = 12;

    service.getBooks(page, limit).subscribe(
      response => {
        expect(response.books).toEqual([]);
        expect(response.totalPages).toBe(0);
      },
      error => {
        fail('Expected to handle error gracefully, but error was thrown');
      }
    );

    const req = httpMock.expectOne(`${service['apiUrl']}?_page=${page}&_per_page=${limit}`);
    expect(req.request.method).toBe('GET');
    req.flush(null, { status: 500, statusText: 'Server Error' });
  });
});
