import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecevabiliteService {
  private baseUrl = 'http://localhost:3000';
  
  constructor(private http: HttpClient) {}

  //afficher les demandes de cession à l'étape de la recevabilité
  getRecevabilites(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/demandes_cession/recevabilites`);
  }
  getRecevabiliteById(id:number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/demandes_cession?id=${id}`);
  }

  //
  postAnalyseRisque(demandeRecevabilite:any): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${this.baseUrl}/demandes_cession/analyse_risque`,demandeRecevabilite, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  //fonction à supprimer lorsque la connexion avec le back sera établie
  deleteRecevabilite(demandeId:number): Observable<HttpEvent<any>> {
    const req = new HttpRequest('DELETE', `${this.baseUrl}/recevabilites/${demandeId}`, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
    
  }
}
