import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    authServiceMock = {
      authenticate: jasmine.createSpy('authenticate').and.returnValue(of({ id: 1, user: 'Test User', email: 'test@example.com', password: 'password' })),
      setCurrentUser: jasmine.createSpy('setCurrentUser')
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login successfully', () => {
    component.loginForm.setValue({ email: 'test@example.com', password: 'password' });
    component.onSubmit();
    expect(authServiceMock.authenticate).toHaveBeenCalledWith('test@example.com', 'password');
    expect(authServiceMock.setCurrentUser).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should fail login with invalid form', () => {
    component.loginForm.setValue({ email: '', password: '' });
    component.onSubmit();
    expect(authServiceMock.authenticate).not.toHaveBeenCalled();
    expect(authServiceMock.setCurrentUser).not.toHaveBeenCalled();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should set loginFailed to true if authentication fails', () => {
    authServiceMock.authenticate.and.returnValue(of(null));
    component.loginForm.setValue({ email: 'test@example.com', password: 'wrongpassword' });
    component.onSubmit();
    expect(component.loginFailed).toBeTrue();
    expect(authServiceMock.setCurrentUser).not.toHaveBeenCalled();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });
});
