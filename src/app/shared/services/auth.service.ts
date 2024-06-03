import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'users';

  constructor(private http: HttpClient) { }

  setCurrentUser(user: IUser): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  clearCurrentUser(): void {
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): IUser | null {
    const user = localStorage.getItem('currentUser');
    if (!user || user === 'undefined') {
      return null;
    }
    return JSON.parse(user) as IUser;
  }

  authenticate(email: string, password: string): Observable<IUser | null> {
    return this.http.get<IUser>(`${this.apiUrl}?email=${email}&password=${password}`).pipe(
      map(user => user ? user : null),
      catchError(() => of(null))
    );
  }
  
}
