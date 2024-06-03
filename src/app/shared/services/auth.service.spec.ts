import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { IUser } from '../interfaces/user.interface';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const mockUser: IUser = {
    id: 1,
    user: 'Test User',
    email: 'test@example.com',
    password: 'password'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set the current user in localStorage', () => {
    service.setCurrentUser(mockUser);
    const user = JSON.parse(localStorage.getItem('currentUser')!);
    expect(user).toEqual(mockUser);
  });

  it('should clear the current user from localStorage', () => {
    localStorage.setItem('currentUser', JSON.stringify(mockUser));
    service.clearCurrentUser();
    const user = localStorage.getItem('currentUser');
    expect(user).toBeNull();
  });

  it('should get the current user from localStorage', () => {
    localStorage.setItem('currentUser', JSON.stringify(mockUser));
    const user = service.getCurrentUser();
    expect(user).toEqual(mockUser);
  });

  it('should return null if no current user in localStorage', () => {
    const user = service.getCurrentUser();
    expect(user).toBeNull();
  });

  it('should authenticate the user with valid credentials', () => {
    service.authenticate('test@example.com', 'password').subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}?email=test@example.com&password=password`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should return null if authentication fails', () => {
    service.authenticate('test@example.com', 'wrongpassword').subscribe(user => {
      expect(user).toBeNull();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}?email=test@example.com&password=wrongpassword`);
    expect(req.request.method).toBe('GET');
    req.flush(null);
  });

  it('should return null if there is a server error', () => {
    service.authenticate('test@example.com', 'password').subscribe(user => {
      expect(user).toBeNull();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}?email=test@example.com&password=password`);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Network error'));
  });
});
