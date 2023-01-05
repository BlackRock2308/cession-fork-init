import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http'
import { catchError, retry } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8'
    // 'Access-Control-Allow-Origin':'*'
    // 'Authorization': 'my-auth-token'
  })
};
const httpOptions2 = {
  headers: new HttpHeaders
    ({
    'enctype':'multipart/form-data'
  })
};
const httpOptionsText = {
  headers: new HttpHeaders({
    'Content-Type': 'text/plain; charset=utf-8'
  })
};
@Injectable()
export class GenericService {

  constructor(public http: HttpClient) { }

  getAll<T>(url: string) {
    return this.http.get(url)
      .pipe(
        catchError(this.handleError('getAll', []))
      );
  }

  getAllPagination<T>(url: string,args:any={}) {
    let params = new HttpParams();
    Object.keys(args).forEach(key => {
      
      params = params.set(key, args[key]);
    

    });

  //   if (args.page) {
  //       params = params.set('page', args.page);
  //   }
  //   if (args.size) {
  //       params = params.set('size', args.size);
  //   }

  //   if (args.sort) {
  //     params = params.set('size', args.sort);
  // }
    return this.http.get<any>(url,{params})
      .pipe(
        catchError(this.handleError('getAll', []))
      );    

  }

  add<T>(url: string, body: T) {
    return this.http.post(url, body, httpOptions)
      .pipe(
        catchError(this.handleError('add', body))
      );
  }

  addWithText<T>(url: string, body: T) {
    return this.http.post(url, body, httpOptionsText)
      .pipe(
        catchError(this.handleError('add', body))
      );
  }

  upload<T>(url: string, body: T) {
    return this.http.post(url, body, httpOptions2)
      .pipe(
        catchError(this.handleError('add', body))
      );
  }

  update<T>(url: string, body: T) {
    return this.http.put(url, body, httpOptions)
      .pipe(
        catchError(this.handleError('update', body))
      );
  }

  patch<T>(url: string, body: T) {
    return this.http.patch(url, body, httpOptions)
      .pipe(
        catchError(this.handleError('patch', body))
      );
  }

  delete<T>(url: string, identifiant: any) {
    return this.http.delete(url + "/" + identifiant, httpOptions)
      .pipe(
        catchError(this.handleError('delete'))
      );
  }

  getById<T>(url: string, id: any) {
    return this.http.get(url + "/" + id, httpOptions)
      .pipe(
        catchError(this.handleError('getById', id))
      );
  }

  getFile<T>(url: string, path: any) {
    return this.http.get(url + "=" + path, {responseType: 'text'})
      .pipe(
        catchError(this.handleError('getFile', path))
      );
  }

  getByName<T>(url: string, nom: any) {
    return this.http.get(url + "/" + nom, httpOptions)
      .pipe(
        catchError(this.handleError('getByName', nom))
      );
  }

  

  findwithParameter<T>(url: string, parameter: string) {
    return this.http.get(url + parameter, httpOptions)
      .pipe(
        catchError(this.handleError('findwithParameter', []))
      );
  }
  findwithMultiCriterAvec4parametre<T>(url: string,parameter1?: string,parameter2?: string,parameter3?: string,parameter4?: string,parameter5?: string) {
    return this.http.get(url + parameter1+'&'+parameter2+'&'+parameter3+'&'+parameter4+'&'+parameter5, httpOptions)
      .pipe(
        catchError(this.handleError('findwithMultiCriterAvec4parametre', []))
      );
  }
  findwithMultiCritereAvec5parametre<T>(url: string,parameter1: string,parameter2: string,parameter3: string,parameter4: Date,parameter5: Date) {
    return this.http.get(url + parameter1+'/'+parameter2+'/'+parameter3+'/'+parameter4+'/'+parameter5, httpOptions)
      .pipe(
        catchError(this.handleError('findwithMultiCritereAvec5parametre', []))
      );
  }
  findwithtwoparameter<T>(url: string,parameter1: string,parameter2: string) {
    return this.http.get(url +"/"+ parameter1+'&'+"/"+parameter2, httpOptions)
      .pipe(
        catchError(this.handleError('findwithtwoparameter', []))
      );
  }
  findwiththreeparameters<T>(url: string,parameter1: string,parameter2: string, parameter3: string) {
    return this.http.get(url + parameter1+'&'+parameter2+'&'+parameter3, httpOptions)
      .pipe(
        catchError(this.handleError('findwithtwoparameter', []))
      );
  }
  findwitht1parameter<T>(url: string,parameter1: string) {
    return this.http.get(url + '/nom/' + parameter1+'/', httpOptions)
      .pipe(
        catchError(this.handleError('findwithtwoparameter', []))
      );
  }

  /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(error as T);
    };
  }
}
