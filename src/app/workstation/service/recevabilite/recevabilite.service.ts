import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {throwError as observableThrowError, Observable } from 'rxjs';
import { ApiSettings } from '../../generic/const/apiSettings.const';
import { PaginatedResults } from '../../model/paginatedResults';
import { map, catchError } from 'rxjs/operators';
import { DemandeCession } from '../../model/demande';
import { GenericService } from '../../generic/generic.service';

@Injectable({
  providedIn: 'root'
})
export class RecevabiliteService extends GenericService {
  
  private demandesCessionUrl =ApiSettings.API_CDMP + '/demandecession'; 
  
  constructor(public http: HttpClient) {
    super(http)
  }

  //afficher les demandes de cession à l'étape de la recevabilité
  // getRecevabilites(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.demandesCessionUrl}/demandes_cession/recevabilites`);
  // }
  getRecevabiliteById(id:number): Observable<any[]> {
    return this.http.get<any[]>(`${this.demandesCessionUrl}/demandes_cession?id=${id}`);
  }

  //
  postAnalyseRisque(demandeRecevabilite:any): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${this.demandesCessionUrl}/demandes_cession/analyse_risque`,demandeRecevabilite, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  validerRecevabilite(id: number, demandeRecevabilite:any): Observable<HttpEvent<any>> {
    const req = new HttpRequest('PATCH', `${this.demandesCessionUrl}/${id}/validerRecevabilite`,demandeRecevabilite, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  rejeterRecevabilite(id: number, demandeRecevabilite:any): Observable<HttpEvent<any>> {
    const req = new HttpRequest('PATCH', `${this.demandesCessionUrl}/${id}/rejeterRecevabilite`,demandeRecevabilite, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  //fonction à supprimer lorsque la connexion avec le back sera établie
  deleteRecevabilite(demandeId:number): Observable<HttpEvent<any>> {
    const req = new HttpRequest('DELETE', `${this.demandesCessionUrl}/recevabilites/${demandeId}`, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
    
  }

  getRecevabilites(args: any = {}): Observable<PaginatedResults> {
    let params = new HttpParams();

    if (args.page) {
        params = params.set('page', args.page);
    }
    if (args.perPage) {
        params = params.set('perPage', args.perPage);
    }
    return this.http.get<PaginatedResults>(this.demandesCessionUrl+'?', { params }).pipe(
        map((response) => {
            response.content.map((app) => new DemandeCession(app));
            return new PaginatedResults(response);

        }),
        //catchError(this.handleError),
    );
}

getPageRecevabilites(args:any): Observable<any> {
  return this.getAllPagination(this.demandesCessionUrl,args)
}


// private handleError(error: any) {
//   return observableThrowError(error);
// }
}
