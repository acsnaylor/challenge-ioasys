import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginFailed: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['books@ioasys.com.br', [Validators.required, Validators.email]],
      password: ['123456789', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.authenticate(email, password).subscribe(user => {
        if (user) {
          this.loginFailed = false;
          this.authService.setCurrentUser(user);
          this.router.navigate(['/dashboard']);    
        } else {
          this.loginFailed = true;
        }
      });
    }
  }
}
