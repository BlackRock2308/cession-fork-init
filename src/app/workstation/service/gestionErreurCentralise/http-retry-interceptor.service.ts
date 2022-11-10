import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retryWhen, catchError } from 'rxjs/operators';
import { genericRetryPolicy } from '../utils.service';

@Injectable({
  providedIn: 'root'
})
export class HttpRetryInterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request)
      .pipe(
        retryWhen(genericRetryPolicy({
          excludedStatusCodes: [400, 401, 403, 404, 500]
        })),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => 'Une erreur est survenue');
        })
      );
    }
}
