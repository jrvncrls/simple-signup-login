import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    // You can also skip interception and directly pass the original request by returning `next.handle(request)`
    request = request.clone({
      withCredentials: true,
    });

    return next.handle(request).pipe(
      map(res => {
        console.log(res);
        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        // Log or handle the error
        console.error('HTTP Error: ', error);

        // Check for authentication error (401)
        if (error.status === 401) {
          this.router.navigate(['/login']); // Redirect to login on 401
        } else {
          alert(error.error?.message || 'An unexpected error occurred.');
        }
        // Rethrow the error so other parts of the app can handle it
        return throwError(
          () => new Error(error.error?.message || 'Unknown error'),
        );
      }),
    );
  }
}
