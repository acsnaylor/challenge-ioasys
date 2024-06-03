import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController,  } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IUser } from '../interfaces/user.interface';
import { AuthService } from '../services/auth.service';
import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let authServiceMock: any;

  const mockUser: IUser = {
    id: 1,
    user: 'Test User',
    email: 'test@example.com',
    password: 'password'
  };

  beforeEach(() => {
    authServiceMock = {
      getCurrentUser: jasmine.createSpy('getCurrentUser').and.returnValue(mockUser)
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: AuthService, useValue: authServiceMock }
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add the API URL to the request', () => {
    httpClient.get('/test').subscribe();

    const req = httpMock.expectOne(`${environment.apiUrl}/test`);
    expect(req.request.url).toBe(`${environment.apiUrl}/test`);
  });

  it('should add Content-Type header when user is authenticated', () => {
    httpClient.get('/test').subscribe();

    const req = httpMock.expectOne(`${environment.apiUrl}/test`);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
  });

  it('should not add Content-Type header when user is not authenticated', () => {
    authServiceMock.getCurrentUser.and.returnValue(null);
    
    httpClient.get('/test').subscribe();

    const req = httpMock.expectOne(`${environment.apiUrl}/test`);
    expect(req.request.headers.get('Content-Type')).toBeNull();
  });
});
