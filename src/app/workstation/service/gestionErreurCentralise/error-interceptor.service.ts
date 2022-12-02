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
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/token-storage.service';


@Injectable({
  providedIn: 'root'
})

export class ErrorInterceptorService  implements HttpInterceptor {
  constructor(
    private router:Router,
    private tokenStorage:TokenStorageService
  ){}
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
                      console.log('erreur serveur',error.name,error.type,error.statusText,error.url,)
                      errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
                      if(error.status===404){
                        this.router.navigate(['404'])
                      }
                      if(error.status===500){
                        this.router.navigate(['error'])
                      }
                      if(error.status===403 || error.status===401){
                        this.tokenStorage.signOut()

                        this.router.navigate(['denied'])
                      }
                  }
                  console.log(errorMessage);
                  return throwError(error);
              })
          )
  }
}
