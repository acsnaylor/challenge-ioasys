import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authServiceMock: any;
  let routerMock: any;

  const mockUser = { id: 1, user: 'Test User', email: 'test@example.com', password: 'password' };

  beforeEach(async () => {
    authServiceMock = {
      getCurrentUser: jasmine.createSpy('getCurrentUser').and.returnValue(mockUser),
      clearCurrentUser: jasmine.createSpy('clearCurrentUser')
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user on init', () => {
    component.ngOnInit();
    expect(authServiceMock.getCurrentUser).toHaveBeenCalled();
    expect(component.user).toEqual(mockUser);
    expect(component.userName).toBe(mockUser.user);
  });

  it('should logout the user', () => {
    component.logout();
    expect(authServiceMock.clearCurrentUser).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });
});
