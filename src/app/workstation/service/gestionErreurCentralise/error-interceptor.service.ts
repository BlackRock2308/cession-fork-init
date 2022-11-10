import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ErrorInterceptorService  implements HttpInterceptor {
  intercept(
      request: HttpRequest<any>,
      next: HttpHandler
  ): Observable<HttpEvent<any>> {
      return next.handle(request)
          .pipe(
              retry(2),
              catchError((error: HttpErrorResponse) => {
                  let errorMessage = '';
                  if (error.error instanceof ErrorEvent) {
                      // erreur client
                      errorMessage = `Error: ${error.error.message}`;
                      console.log('erreur client')
                  } else {
                      // erreur serveur
                      console.log('erreur serveur')
                      errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
                  }
                  console.log(errorMessage);
                  return throwError(errorMessage);
              })
          )
  }
}
