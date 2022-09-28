import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DemandeAdhesion } from '../../model/demande';
import { PME } from '../../model/pme';

@Injectable({
  providedIn: 'root'
})
export class AdhesionService {
  private baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  postPME(demande: any): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${this.baseUrl}/pmes`, demande, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }
  //cette service est à supprimer lorsqu'on connecte au backend
  postAdhesionDemande(demande: any): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${this.baseUrl}/adhesion_demandes`, demande, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  getAdhesionDemandes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/adhesion_demandes`);
  }

  patchPME(id:number,pme: PME): Observable<any> {
    return this.http.patch(`${this.baseUrl}/pmes/${id}`, pme);

  }

  //cette service est à supprimer lorsqu'on connecte au backend
  delateAdhesionDemande(demandeId:number): Observable<HttpEvent<any>> {
    const req = new HttpRequest('DELETE', `${this.baseUrl}/adhesion_demandes/${demandeId}`, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
    
  }

}
