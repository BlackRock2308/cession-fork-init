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
  postRecevabilite(demandeRecevabilite:any): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${this.baseUrl}/recevabilites`,demandeRecevabilite, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }
}
