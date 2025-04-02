import { HttpInterceptorFn } from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {inject} from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authHeader = authService.getAuthHeader();

  if (authHeader) {
    const clonedRequest = req.clone({
      setHeaders: { Authorization: authHeader }
    });
    return next(clonedRequest);
  }
  return next(req);
};
