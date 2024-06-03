import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const currentUser = this.authService.getCurrentUser();
    let modifiedReq = req.clone({
      url: `${environment.apiUrl}${req.url}`
    });

    if (currentUser) {
      modifiedReq = modifiedReq.clone({
        headers: modifiedReq.headers.set('Content-Type', 'application/json')
      });
    }

    return next.handle(modifiedReq);
  }
}
