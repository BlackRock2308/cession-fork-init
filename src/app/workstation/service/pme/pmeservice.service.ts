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
export class PmeService extends GenericService{
  private pmeUrl =ApiSettings.API_CDMP + '/pme'; 

  constructor(public http:HttpClient) { 
    super(http)
  }

  getTypesDocument(): Observable<any[]> {
    return this.http.get<any[]>(`${this.pmeUrl}/types_document`);
  }

  getDocumentsComplémentaires():Observable<any[]>{
    return this.http.get<any[]>(`${this.pmeUrl}/documents_complementaire`);
  }

  postDocument(document:any): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${this.pmeUrl}/documents_complementaire`, document, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  patchStatutDemande(id:number,statut:any):Observable<DemandeAdhesion>{
    return this.http.patch<DemandeAdhesion>(`${this.pmeUrl}/demandes_adhesion/${id}`,statut)
  }

  getConventions():Observable<any[]>{
    return this.http.get<any[]>(`${this.pmeUrl}/conventionsPME`);
  }
  
  //enregistrer les informations d'un pme demandant l'adhesion

  postPME(data) {

  let body = JSON.stringify(data);
  return this.add(this.pmeUrl, body);
}

  
  //patcher les informations de la pme
  patchPME(id:number,pme: PME): Observable<any> {
    return this.http.patch(`${this.pmeUrl}/${id}`, pme);

  }

}
