import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiSettings } from '../../generic/const/apiSettings.const';
import { DemandeAdhesion } from '../../model/demande';

@Injectable({
  providedIn: 'root'
})
export class ConventionService {
  private conventionUrl =ApiSettings.API_CDMP + '/conventions'; 


  constructor(private http:HttpClient) { }

  patchStatutDemande(id:number,statut:any):Observable<DemandeAdhesion>{
    return this.http.patch<DemandeAdhesion>(`${this.conventionUrl}/demandes_adhesion/${id}`,statut)
  }

  getConventions():Observable<any[]>{
    return this.http.get<any[]>(`${this.conventionUrl}/conventionsPME`);
  }

}
