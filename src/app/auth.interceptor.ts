import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // You can also skip interception and directly pass the original request by returning `next.handle(request)`
    request = request.clone({
      withCredentials: true,
    });

    return next.handle(request).pipe(
      map((res) => {
        console.log(res);
        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        // Optionally handle the error or rethrow it
        alert(error.error.message)
        return throwError(() => new Error(error.error.message));
      })
    );
  }
}
