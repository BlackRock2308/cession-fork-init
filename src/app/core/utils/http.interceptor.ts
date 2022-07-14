import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpParams
} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';

@Injectable()
export class HttpReqInterceptor implements HttpInterceptor {
  private requestCounter: BehaviorSubject<number> = new BehaviorSubject(0);


  constructor(private translate: TranslateService) {}


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requestCounter.next(this.requestCounter.getValue() + 1);

    // append json
    const headers = req.headers;

    // remove content type from files
    if (headers.get('Content-Type') === 'multipart/form-data') {
      req.headers.append('Content-Type', '');
    } else {
      req.headers.append('Content-Type', 'application/json');
    }

    // add language params
    let params = req.params ? req.params : new HttpParams();
    if (!req.params.get('langCode')) {
      params = req.params.set('langCode', this.translate.currentLang);
    }

    const request = req.clone({ params });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => event),
      catchError((error: any) => throwError(error)),
      finalize(() => {
        this.requestCounter.next(Math.max(this.requestCounter.getValue() - 1, 0));
      }),
    );
  }
}
