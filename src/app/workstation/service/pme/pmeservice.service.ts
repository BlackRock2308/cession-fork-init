import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DemandeAdhesion } from '../../model/demande';

@Injectable({
  providedIn: 'root'
})
export class PmeService {
  private baseUrl = 'http://localhost:3000';


  constructor(private http:HttpClient) { }
  getProducts() {
    throw new Error('Method not implemented.');
  }

  getTypesDocument(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/types_document`);
  }

  getDocumentsComplémentaires():Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/documents_complementaire`);
  }

  postDocument(document:any): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${this.baseUrl}/documents_complementaire`, document, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  patchStatutDemande(id:number,statut:any):Observable<DemandeAdhesion>{
    return this.http.patch<DemandeAdhesion>(`${this.baseUrl}/demandes_adhesion/${id}`,statut)
  }
}
