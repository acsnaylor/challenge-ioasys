import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { IUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit  {
  user: IUser | null = null;
  userName: string = '';

  constructor(private authService: AuthService, private router: Router){
    
  }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    this.user = this.authService.getCurrentUser();
    if (this.user) {
      this.userName = this.user.user;
    }
  }

  logout(): void {
    this.authService.clearCurrentUser();
    this.router.navigate(['/login']);
  }
}
