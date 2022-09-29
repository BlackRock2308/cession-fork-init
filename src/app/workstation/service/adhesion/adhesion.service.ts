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


  //enregistrer les informations d'un pme demandant l'adhesion
  postPME(demande: any): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${this.baseUrl}/pmes`, demande, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }
  //cette service est à supprimer lorsqu'on connecte au backend postpme suffira
  postAdhesionDemande(demande: any): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${this.baseUrl}/adhesion_demandes`, demande, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  //retourner les demandes d'adhesion qui n'ont pas encore été taité
  getAdhesionDemandes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/adhesion_demandes`);
  }

  //patcher les informations de la pme
  patchPME(id:number,pme: PME): Observable<any> {
    return this.http.patch(`${this.baseUrl}/pmes/${id}`, pme);

  }

  //cette service est à supprimer lorsqu'on connecte au backend 
  //partout où l'on l'aurait appelé on le remplacera par un patch et changer le statut d'attente de vérification
  delateAdhesionDemande(demandeId:number): Observable<HttpEvent<any>> {
    const req = new HttpRequest('DELETE', `${this.baseUrl}/adhesion_demandes/${demandeId}`, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
    
  }

}
