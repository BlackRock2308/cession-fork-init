import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiSettings } from '../../generic/const/apiSettings.const';
import { GenericService } from '../../generic/generic.service';
import { DemandeAdhesion } from '../../model/demande';
import { PME } from '../../model/pme';

@Injectable({
  providedIn: 'root'
})
export class AdhesionService extends GenericService {
  
  private demandesADHUrl =ApiSettings.API_CDMP + '/demandeadhesion'; 
 
  constructor(public http: HttpClient) {
    super(http)
   }

  //Ajout d'une demande d'adhésion
  postAdhesionDemande(data) {

  let body = JSON.stringify(data);
  return this.add(this.demandesADHUrl, body);
}

  //retourner les demandes d'adhesion qui n'ont pas encore été taité
  getAdhesionDemandes(): Observable<any> {
    return this.http.get(`${this.demandesADHUrl}/`);
  }


  //cette service est à supprimer lorsqu'on connecte au backend 
  //partout où l'on l'aurait appelé on le remplacera par un patch et changer le statut d'attente de vérification
  delateAdhesionDemande(demandeId:number): Observable<HttpEvent<any>> {
    const req = new HttpRequest('DELETE', `${this.demandesADHUrl}/${demandeId}`, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
    
  }

}
